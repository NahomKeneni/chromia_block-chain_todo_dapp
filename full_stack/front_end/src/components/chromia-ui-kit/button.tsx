"use client";

import { Button } from "@chromia/ui-kit";

export default Button as React.FC<
  React.ComponentProps<typeof Button> & {
    variant?: string;
    size?: "s" | "l";
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>;
