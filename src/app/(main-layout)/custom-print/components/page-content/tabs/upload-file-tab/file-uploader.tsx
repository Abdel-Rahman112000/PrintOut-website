import LoadingBackdrop from "@/components/LoadingBackdrop";
import { getServerAuthHeaders } from "@/libs/auth/getServerAuthHeaders";
import {
  UploadCustomOrderFilesSchemaType,
  uploadCustomOrderFiles,
  uploadCustomOrderFilesSchema,
} from "@/utils/api/order/upload-custom-order-files";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  ButtonBase,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { FilePond } from "react-filepond";
import { Controller, useForm } from "react-hook-form";
import { TabsContext } from "../..";
import { useRouter } from "next/navigation";

function FileUploader() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UploadCustomOrderFilesSchemaType>({
    resolver: zodResolver(uploadCustomOrderFilesSchema),
  });

  const { setOrderId } = useContext(TabsContext);

  const onSubmit = handleSubmit(async (data) => {
    const headers = await getServerAuthHeaders();
    const res = await uploadCustomOrderFiles(headers, data);
    // setOrderId(`${res.order.id}`);
    router.push(`/custom-print-v2?orderId=${res.order.id}`);
  });

  return (
    <>
      <LoadingBackdrop open={isSubmitting} />
      <div>
        <Container maxWidth="md">
          <div>
            <Stack
              component="form"
              onSubmit={onSubmit}
              noValidate
              alignItems="center"
              spacing={4}
            >
              <Typography variant="h5" fontWeight={500}>
                Upload your creation
              </Typography>
              <Paper
                variant="outlined"
                sx={{ width: 1, borderStyle: "dashed" }}
              >
                <Controller
                  name="file"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <FilePond
                        files={field.value}
                        onupdatefiles={(files) => {
                          field.onChange(
                            files.map((filepondFile) => filepondFile.file)
                          );
                        }}
                        allowMultiple={true}
                      />
                      <Typography color="error">
                        {fieldState.error?.message}
                      </Typography>
                    </>
                  )}
                />
              </Paper>
              <Box sx={{ display: "flex", gap: 4 }}>
                <Chip
                  component={ButtonBase}
                  clickable
                  type="submit"
                  label="upload"
                  color="primary"
                />
                <Chip
                  clickable
                  label="Browse Ready made products"
                  variant="outlined"
                  color="primary"
                />
              </Box>
            </Stack>
          </div>
        </Container>
      </div>
    </>
  );
}

export default FileUploader;
