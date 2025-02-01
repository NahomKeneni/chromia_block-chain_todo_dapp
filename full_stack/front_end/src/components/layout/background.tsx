"use client";

import Image from "next/image";
import { useTheme as useNextTheme } from "next-themes";

const Background = () => {
  const { theme } = useNextTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-x-0 top-0 -z-50 h-[300px] md:h-[350px]">
      {/* Mobile Background */}
      <Image
        src={isDark ? "/assets/images/logo.svg" : "/assets/images/bg-mobile-light.jpg"}
        alt="background"
        className="block object-cover md:hidden"
        fill
        priority
        quality={100}
      />
      {/* Desktop Background */}
      <Image
        src={isDark ? "/assets/images/logo.svg" : "/assets/images/bg-desktop-light.jpg"}
        alt="background"
        className="hidden object-cover md:block"
        fill
        priority
        quality={100}
      />
    </div>
  );
};

export default Background; 