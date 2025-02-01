"use client";

import { Input } from "@chromia/ui-kit";

export default Input as React.FC<
  React.ComponentProps<typeof Input> &
    React.InputHTMLAttributes<HTMLInputElement>
>;
