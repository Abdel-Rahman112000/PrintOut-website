import { Box, Stack, Typography } from "@mui/material";
import "./style.css";
function PrivacyPage() {
  return (
    <Stack>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Effective Date: January 1, 2025
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "20px", fontWeight: 500 }}>
        Website:{" "}
        <Box sx={{ textDecoration: "underLine" }} component={"a"} href="">
          printout.solutions
        </Box>
      </Typography>
      <Stack sx={{ ml: 5 }}>
        <ol className="orderList">
          <li>
            Introduction
            <dt>
              Welcome to PrintOut. Your privacy is important to us. This Privacy
              Policy explains how we collect, use, and protect your personal
              data when using our platform, mobile apps, and services. By using
              PrintOut, you agree to the terms outlined in this Privacy Policy.
            </dt>
          </li>

          <li>
            Information We Collect
            <dt>We collect the following data:</dt>
            <ul>
              <li>
                Personal Information: Name, email, phone number, shipping
                address, company details (for corporate users).
              </li>
              <li>
                Personal Information: Name, email, phone number, shipping
                address, company details (for corporate users).
              </li>
              <li>
                Order Details: Custom print requests, uploaded designs, order
                history.
              </li>
              <li>
                Usage Data: Website & app activity, preferences, device details.
              </li>
            </ul>
          </li>
          <li>
            How We Use Your Information
            <dt>We use your data to:</dt>
            <ul>
              <li>Process orders and payments.</li>
              <li>
                Deliver products on time, including same-day delivery for custom
                print orders.
              </li>
              <li>
                Notify you about order updates, pricing approvals (for laser
                cutting orders), and shipping details.
              </li>
              <li>Improve our services and provide customer support. </li>
            </ul>
          </li>
          <li>
            Data Sharing & Security
            <ul>
              <li>We do not sell your data to third parties.</li>
              <li>Payment details are processed securely via Paymob Egypt.</li>
              <li>
                We may share necessary data with delivery providers for shipping
                purposes.
              </li>
            </ul>
          </li>
          <li>
            Your Rights
            <ul>
              <li>Access or update your account details.</li>
              <li>
                Request data deletion (excluding required transaction records).
              </li>
              <li>Opt out of marketing communications.</li>
            </ul>
          </li>
        </ol>
      </Stack>
    </Stack>
  );
}

export default PrivacyPage;
