import React from "react";

import { cn } from "@/lib/utils";

import LinkIconButton from "../chromia-ui-kit/link-icon-button";
import DiscordIcon from "../icons/discord";
import GlobeIcon from "../icons/globe";
import LinkedinIcon from "../icons/linkedin";
import TelegramIcon from "../icons/telegram";
import XIcon from "../icons/x";

const Footer = () => {
  const classNameLeftCube = cn(
    "before:cube before:left-[-4px] before:top-[-4px] before:hidden sm:before:block",
  );
  const classNameRightCube = cn(
    "after:cube after:right-[-4px] after:top-[-4px] after:hidden sm:after:block",
  );

  return (
    <div className="mt-auto border-0 border-t border-solid border-border/20 bg-popover/10 backdrop-blur-md">
      <div
        className={cn(
          "container relative h-full space-y-4 border-0 border-l border-r border-border/20 py-6 text-sm text-foreground/80 sm:border-solid",
          classNameLeftCube,
          classNameRightCube,
        )}
      >
        <div className="flex items-center justify-center gap-2">
          <LinkIconButton
            href="https://chromia.com/"
            target="_blank"
            rel="noopener noreferrer"
            size="l"
            variant="ghost"
            Icon={<GlobeIcon className="text-2xl" />}
          />
          <LinkIconButton
            href="https://discord.com/invite/chromia"
            target="_blank"
            rel="noopener noreferrer"
            size="l"
            variant="ghost"
            Icon={<DiscordIcon className="text-2xl" />}
          />
          <LinkIconButton
            href="https://t.me/hellochromia"
            target="_blank"
            rel="noopener noreferrer"
            size="l"
            variant="ghost"
            Icon={<TelegramIcon className="text-2xl" />}
          />
          <LinkIconButton
            href="https://x.com/Chromia"
            size="l"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            Icon={<XIcon className="text-2xl" />}
          />
        </div>
        <p className="text-center text-xs md:text-base">
          © 2024, All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
