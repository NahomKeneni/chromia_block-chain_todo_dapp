"use client";

import { LinkIconButton } from "@chromia/ui-kit";

export default LinkIconButton as React.FC<
  Omit<React.ComponentProps<typeof LinkIconButton>, "href"> & {
    variant?: string;
    size?: string;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>;
