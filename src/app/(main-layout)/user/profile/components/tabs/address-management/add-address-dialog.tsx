import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddressFormData,
  addAddress,
  addAddressSchema,
} from "@/utils/api/address/add-address";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refresh: () => void;
};

function AddAddressDialog({ open, setOpen, refresh }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addAddressSchema),
  });

  // Handler for form submission
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      const headers = await getClientAuthHeaders();
      const res = await addAddress(headers, data);
      refresh();
      setOpen(false);
      return res;
    } catch (error) {
      console.log(error);
    }
  });

  console.log(errors);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add Address</DialogTitle>
      <Box component="form" noValidate onSubmit={onSubmit}>
        <DialogContent>
          <TextField
            label="Address 1"
            fullWidth
            margin="normal"
            multiline
            minRows={2}
            {...register("address_1")}
            error={!!errors.address_1}
            helperText={errors.address_1?.message}
          />
          <TextField
            label="Address 2"
            fullWidth
            margin="normal"
            multiline
            minRows={2}
            {...register("address_2")}
            error={!!errors.address_2}
            helperText={errors.address_2?.message}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            {...register("city")}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <TextField
            label="Zip Code"
            fullWidth
            margin="normal"
            {...register("zib_code")}
            error={!!errors.zib_code}
            helperText={errors.zib_code?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => console.log("Cancelled")}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default AddAddressDialog;
