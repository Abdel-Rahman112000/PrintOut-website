import { Stack } from "@mui/material";
import Breif from "./breif";
import FileUploader from "./file-uploader";

function UploadFileTab() {
  return (
    <Stack spacing={12}>
      <Breif />
      <FileUploader />
    </Stack>
  );
}

export default UploadFileTab;
