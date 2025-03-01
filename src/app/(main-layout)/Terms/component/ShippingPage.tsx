import { Box, Stack, Typography } from "@mui/material";
import "./style.css";
function ShippingPage() {
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
            Shipping Methods & Delivery Times
            <ul>
              <li>
                Custom Print Orders: Same-day delivery if placed before the
                backend-specified cutoff time.
              </li>
              <li>
                Laser Cutting Orders: Delivery timeframe depends on pricing
                approval & production.
              </li>
              <li>
                Ready Giveaways & Custom Products: Standard delivery times apply
                (estimated at checkout).
              </li>
            </ul>
          </li>

          <li>
            Delivery Service & Tracking
            <ul>
              <li>
                Orders are delivered via PrintOut’s Delivery App or third-party
                couriers.
              </li>
              <li>Tracking updates will be sent via email/SMS.</li>
            </ul>
          </li>
          <li>
            Shipping Fees
            <ul>
              <li>
                Shipping costs depend on the order type, delivery location, and
                urgency.
              </li>
              <li>Fees are displayed at checkout before payment.</li>
            </ul>
          </li>
          <li>
            Failed Deliveries & Reattempts
            <ul>
              <li>
                If delivery fails due to incorrect address or recipient
                unavailability, reattempts will be scheduled with additional
                charges.
              </li>
            </ul>
          </li>
          <li>
            Contact & Support
            <ul>
              <li>
                For any shipping-related queries, email
                <span>
                  <a href=""> support@printout.solutions.</a>
                </span>
              </li>
            </ul>
          </li>
        </ol>
      </Stack>
    </Stack>
  );
}

export default ShippingPage;
