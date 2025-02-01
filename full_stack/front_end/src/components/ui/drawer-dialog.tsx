import type React from "react";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { useMediaQuery } from "@/hooks/use-media-query";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";

type DrawerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
  title: React.ReactNode;
  footer?: React.ReactNode;
  DialogContentProps?: React.ComponentProps<typeof DialogContent>;
  visuallyHiddenTitle?: boolean;
};

export const DrawerDialog = ({
  open,
  onOpenChange,
  children,
  title,
  footer,
  DialogContentProps = {},
  visuallyHiddenTitle = false,
}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent {...DialogContentProps}>
          {title ? (
            <DialogHeader>
              {visuallyHiddenTitle ? (
                <VisuallyHidden.Root>
                  <DialogTitle>{title}</DialogTitle>
                </VisuallyHidden.Root>
              ) : (
                <DialogTitle>{title}</DialogTitle>
              )}
            </DialogHeader>
          ) : null}
          {children}
          {footer ? <DialogFooter>{footer}</DialogFooter> : null}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          {title ? (
            visuallyHiddenTitle ? (
              <VisuallyHidden.Root>
                <DrawerTitle>{title}</DrawerTitle>
              </VisuallyHidden.Root>
            ) : (
              <DrawerTitle>{title}</DrawerTitle>
            )
          ) : null}
        </DrawerHeader>
        {children}
        {footer ? <DrawerFooter>{footer}</DrawerFooter> : null}
      </DrawerContent>
    </Drawer>
  );
};
