import { IMAGE_FIT_STYLES } from "@/constants/image-fit-styles";
import { WithMediaProps } from "..";

function ImageView({ media }: WithMediaProps) {
  return (
    <img
      src={media.original_url}
      alt={media.file_name}
      style={IMAGE_FIT_STYLES}
    />
  );
}

export default ImageView;
