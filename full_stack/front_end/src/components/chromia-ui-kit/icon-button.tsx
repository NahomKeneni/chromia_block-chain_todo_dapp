"use client";

import { IconButton } from "@chromia/ui-kit";

export default IconButton as React.FC<
  React.ComponentProps<typeof IconButton> & {
    variant?: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>;
