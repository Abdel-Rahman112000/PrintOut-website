const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const cors = require("cors");
const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const Sentiment = require("sentiment");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const sentiment = new Sentiment();

// Pusher configuration
const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  encrypted: true,
});

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else if (pathname === "/api/send-message" && req.method == "POST") {
        const { message } = req.body;

        if (!message) {
          return res.status(400).send({ error: "Message is required" });
        }

        // Analyze message sentiment (optional)
        const sentimentResult = sentiment.analyze(message);

        // Trigger Pusher event
        pusher.trigger("chat-channel", "new-message", {
          message,
          sentiment: sentimentResult,
        });

        res.status(200).send({ success: true });
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
