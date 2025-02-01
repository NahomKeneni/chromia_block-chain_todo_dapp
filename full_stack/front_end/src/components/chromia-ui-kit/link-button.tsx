"use client";

import { LinkButton } from "@chromia/ui-kit";

export default LinkButton as React.FC<
  Omit<React.ComponentProps<typeof LinkButton>, "href"> & {
    variant?: string;
    size?: "s" | "l";
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>;
