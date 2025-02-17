import MediaComponent from "@/components/video-player";
import { WithMediaProps } from "..";

function VideoView({ media }: WithMediaProps) {
  return <MediaComponent videoSrc={media.original_url} />;
}

export default VideoView;
