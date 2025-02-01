import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import logo from "../../assets/logo.svg";
import { ConnectWallet } from "./wallet";
import Theme from "./theme";
import Title from "./title";

const Header = () => {
  return (
    <div className="sticky left-0 right-0 top-0 z-50 h-20">
      <div className="container relative flex h-full items-center justify-between">
        {/* <Title /> */}
        <img src='/todo.jpeg' className="rounded-lg"></img>
        <div className="flex items-center gap-6">
          <Theme />
          {/* <ConnectWallet /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
