import { Media } from "@/types/common/Media";
import { Paper, Stack } from "@mui/material";

type Props = {
  images: Media[];
};

function ImagesPreview({ images }: Props) {
  return (
    <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <Stack spacing={2}>
        {images.map((image) => (
          <Paper key={image.uuid} sx={{ borderRadius: 0 }} elevation={5}>
            <img
              style={{ width: "100%" }}
              src={image.original_url}
              alt={image.file_name}
            />
          </Paper>
        ))}
      </Stack>
    </div>
  );
}

export default ImagesPreview;
