import { Media } from "@/types/common/Media";
import { ReactNode } from "react";
import ImageView from "./views/ImageView";
import VideoView from "./views/VideoView";

function RenderMedia({ media }: RenderMediaProps) {
  let view: ReactNode = null;
  if (!media) view = null;
  else if (media.mime_type.startsWith("image")) {
    view = <ImageView media={media} />;
  } else if (media.mime_type.startsWith("video")) {
    view = <VideoView media={media} />;
  }

  return view;
}

type RenderMediaProps = { media: WithMediaProps["media"] | undefined };

export type WithMediaProps = {
  media: Media;
};

export default RenderMedia;
