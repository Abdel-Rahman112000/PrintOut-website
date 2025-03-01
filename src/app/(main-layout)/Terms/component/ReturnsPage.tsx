import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "./style.css";
function ReturnsPage() {
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
            Return & Refund Eligibility
            <ul>
              <li>
                Due to the nature of our products, returns and refunds are
                handled based on order type:
              </li>
            </ul>
          </li>
        </ol>
        <TableContainer component={Paper} sx={{ mt: 5 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontSize: "18px", fontWeight: 600, width: "250px" }}
                >
                  Order Type
                </TableCell>
                <TableCell
                  sx={{ fontSize: "18px", fontWeight: 600, width: "300px" }}
                >
                  Return Policy
                </TableCell>
                <TableCell
                  sx={{ fontSize: "18px", fontWeight: 600, width: "300px" }}
                >
                  Refund Policy
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontSize: "18px", fontWeight: 600 }}>
                  <ul>
                    <li>Custom Print Orders</li>
                  </ul>
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "15px" }}>
                  Non-returnable unless defective.
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "15px" }}>
                  Refunds only for damaged/incorrect items.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontSize: "18px", fontWeight: 600 }}>
                  <ul>
                    <li>Laser Cutting Orders</li>
                  </ul>
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "15px" }}>
                  Non-returnable.
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "15px" }}>
                  No refunds after pricing approval & payment.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontSize: "18px", fontWeight: 600 }}>
                  <ul>
                    <li>Ready Giveaways</li>
                  </ul>
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "15px" }}>
                  Returns accepted within <span>7 days</span> if unused.
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "15px" }}>
                  Refunds processed within <span> 5 business days</span> after
                  approval.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontSize: "18px", fontWeight: 600 }}>
                  <ul>
                    <li>Custom Products</li>
                  </ul>
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "15px" }}>
                  Returns only for manufacturing defects.
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "15px" }}>
                  Refunds applicable if cancellation happens before production
                  starts.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <ol className="orderList">
          <li>
            How to Request a Return/Refund
            <ul>
              <li>
                Contact support@printout.solutions within <span>48 hours</span>
                of receiving your order.
              </li>
              <li>
                Attach <span>photos</span> of the issue for verification.
              </li>
            </ul>
            <dt>
              Refunds are processed through <span>Paymob Egypt</span> to the
              original payment method.
            </dt>
          </li>
        </ol>
      </Stack>
    </Stack>
  );
}

export default ReturnsPage;
