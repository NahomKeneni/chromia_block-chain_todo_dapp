"use client";

import type React from "react";
import { useState } from "react";

import { useServerInsertedHTML } from "next/navigation";

import { getCssText, resetStyle } from "@chromia/ui-kit";

const ClientStyles = ({ children }: { children: React.ReactNode }) => {
  const [isRendered, setIsRendered] = useState(false);

  useServerInsertedHTML(() => {
    if (!isRendered) {
      setIsRendered(true);
      return (
        <>
          <style
            dangerouslySetInnerHTML={{ __html: resetStyle }}
            id="stitches-reset"
          />
          <style
            dangerouslySetInnerHTML={{ __html: getCssText() }}
            id="stitches"
          />
        </>
      );
    }

    return void 0;
  });

  return <>{children}</>;
};

export default ClientStyles;
