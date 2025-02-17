"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

function ShowTitleOnHover({ children, label }: Props) {
  return (
    <motion.div
      style={{ width: "100%", height: "100%", position: "relative" }}
      whileHover={"on-hover"}
    >
      {children}
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          background: "#000000A0",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={{
          opacity: 0,
        }}
        variants={{
          "on-hover": {
            opacity: 1,
          },
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

type Props = {
  children: ReactNode;
  label: ReactNode;
};

export default ShowTitleOnHover;
