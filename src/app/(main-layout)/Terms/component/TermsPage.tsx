import { Box, Stack, Typography } from "@mui/material";
import "./style.css";
function TermsPage() {
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
            General Terms
            <dt>By using PrintOut, you agree to these Terms & Conditions.</dt>
          </li>

          <li>
            Account Registration
            <ul>
              <li>
                Individual users must verify their identity before placing
                orders.
              </li>
              <li>
                Corporate users must provide valid company details during
                sign-up.
              </li>
            </ul>
          </li>
          <li>
            Orders & Payment
            <ul>
              <li>All payments are securely processed via Paymob Egypt.</li>
              <li>
                Deposits: Individual customers must pay a deposit (set by
                admins) before order processing, except for laser cutting
                orders.
              </li>
              <li>
                Custom Pricing: Laser cutting orders require manual pricing
                approval by a PrintOut team operator before checkout.
              </li>
            </ul>
          </li>
          <li>
            Delivery & Shipping
            <ul>
              <li>
                Same-day delivery is available for custom print orders placed
                before the cutoff time set in the backend.
              </li>
              <li>
                Customers must ensure accurate delivery details to avoid delays.
              </li>
            </ul>
          </li>
          <li>
            Cancellations & Modifications
            <ul>
              <li>Orders cannot be canceled once production starts.</li>
              <li>
                Laser cutting orders can only be modified before pricing
                approval.
              </li>
            </ul>
          </li>

          <li>
            Limitation of Liability
            <dt>
              PrintOut is not responsible for errors in user-submitted designs,
              incorrect addresses, or third-party delivery delays.
            </dt>
          </li>
          <li>
            Contact Information
            <dt>
              For any issues, contact{" "}
              <span>
                <a href=""> support@printout.solutions.</a>
              </span>
            </dt>
          </li>
        </ol>
      </Stack>
    </Stack>
  );
}

export default TermsPage;
