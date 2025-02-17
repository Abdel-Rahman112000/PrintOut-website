"use client";

import { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Plyr, { PlyrProps } from "plyr-react";

export function Video(props: PlyrProps) {
  const [importedComponent, setImportedComponent] =
    useState<ReactElement | null>(null);

  useEffect(() => {
    const importComponent = async () => {
      const myModule = await import("plyr-react");
      const Plyr = myModule.default;
      setImportedComponent(<Plyr {...props} />);
    };

    importComponent();
  }, []);

  return importedComponent;
}

function MediaComponent({ videoSrc }: Props) {
  return (
    <div
      className="media-component"
      style={{ width: "100%", height: "100%", backgroundColor: "gray" }}
    >
      <Video
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        source={{
          sources: [{ src: videoSrc }],
          type: "video",
        }}
        controls
        options={{
          controls: ["play", "progress", "volume"],
          autoplay: true,
          muted: true,
        }}
      />
    </div>
  );
}

type Props = {
  videoSrc: string;
};

export default MediaComponent;
