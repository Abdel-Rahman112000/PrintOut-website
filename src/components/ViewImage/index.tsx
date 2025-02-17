"use client";

import { useState } from "react";
import FsLightbox from "fslightbox-react";

function ViewImage({ image, render }: Props) {
  const [toggler, setToggler] = useState(false);
  const toggle = () => setToggler(!toggler);
  const Render = render;
  return (
    <>
      <Render open={toggle} />
      <FsLightbox
        toggler={toggler}
        sources={[
          <img
            key={image}
            alt="toggler"
            style={{ height: "90vh" }}
            src={image}
          />,
        ]}
        sourceIndex={0}
      />
    </>
  );
}

type Props = {
  image: string;
  render: (props: RenderProps) => JSX.Element;
};
type RenderProps = {
  open: () => void;
};

export default ViewImage;
