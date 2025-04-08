import { Product } from "@/types/common/Product";
import { Box, Typography } from "@mui/material";

function VideoCard({ product }: PropsType) {
  console.log("object", product);
  return (
    <>
      {product?.media[0]?.mime_type?.includes("video") && (
        <>
          <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
            Featured Video
          </Typography>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%", // 16:9 Aspect Ratio
              }}
            >
              <Box
                component="iframe"
                src={product?.media[0]?.original_url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
              ></Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default VideoCard;
type PropsType = {
  product: Product;
};
