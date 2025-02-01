"use client";

import { ConnectKitButton } from "connectkit";
import { ChevronDown } from "lucide-react";

import Button from "../chromia-ui-kit/button";
import { Logout, Metamask } from "../chromia-ui-kit/icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function ConnectWallet() {
  return (
    <ConnectKitButton.Custom>
      {({ show, isConnected, isConnecting, truncatedAddress }) => {
        if (isConnected) {
          const metamask = (
            <div className="flex items-center gap-2">
              <Metamask className="h-5 w-5" />
              <div className="space-y-1">
                <span className="block text-sm leading-none text-muted-foreground">
                  Connected wallet
                </span>
                <span className="block font-bold leading-none">
                  {truncatedAddress?.replaceAll("•", ".")}
                </span>
              </div>
              <button
                className="ml-auto cursor-pointer p-1"
                type="button"
                onClick={show}
              >
                <Logout className="h-4 w-4" />
              </button>
            </div>
          );

          return (
            <>
              <Popover>
                <PopoverTrigger className="flex h-full items-center border-0 border-l border-solid border-border/20 pl-6 sm:hidden">
                  <ChevronDown className="transition-transform [[data-state='open']_&]:rotate-180" />
                </PopoverTrigger>
                <PopoverContent className="space-y-4">
                  {metamask}
                </PopoverContent>
              </Popover>

              <div className="hidden h-full items-center gap-6 border-0 border-l border-solid border-border/20 pl-6 sm:flex">
                {metamask}
              </div>
            </>
          );
        }

        return (
          <Button
            data-id="connect-wallet-btn"
            onClick={show}
            className="w-44"
            disabled={isConnecting}
          >
            Connect wallet
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
