import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Stack, Typography } from "@mui/material";
import { Order } from "@/types/common/Order";

export default function ProductsTable(props: PropsType) {
  const { mainOrder } = props;

  return (
    <TableContainer component={Paper} sx={{ my: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            bgcolor: "#f2f4f5",
          }}
        >
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell>Products Name</TableCell>
            <TableCell>Products Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Sub-Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mainOrder?.orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Stack
                  spacing={2}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"start"}
                >
                  <img
                    src={order?.media?.[0]?.original_url}
                    width={80}
                    height={80}
                    alt="product image"
                    style={{ objectFit: "cover" }}
                  />
                </Stack>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{order?.product_name}</Typography>
              </TableCell>
              <TableCell>
                {
                  <Typography fontSize={15} fontWeight={500} color={"primary"}>
                    {order?.type?.name}
                  </Typography>
                }
              </TableCell>
              <TableCell>{order?.total_price}</TableCell>
              <TableCell>x1</TableCell>
              <TableCell>{order?.total_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

type PropsType = {
  mainOrder: Order | undefined;
};
