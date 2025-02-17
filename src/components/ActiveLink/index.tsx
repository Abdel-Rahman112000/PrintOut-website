"use client";

import { usePathname } from "next/navigation";
import { LinkProps } from "next/link";
import { ReactNode } from "react";

interface ActiveLinkRenderProps {
  linkProps: LinkProps;
  isActive: boolean;
}

interface ActiveLinkProps {
  path: string;
  render: (props: ActiveLinkRenderProps) => ReactNode;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ path, render }) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  const linkProps: LinkProps = {
    href: path,
  };

  return render({ linkProps, isActive });
};

export default ActiveLink;
