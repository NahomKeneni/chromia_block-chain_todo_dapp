"use client";

import { useTheme as useNextTheme } from "next-themes";
import Image from "next/image";
import iconMoon from "../../../public/assets/images/icon-moon.svg";
import iconSun from "../../../public/assets/images/icon-sun.svg";

const Theme = () => {
  const { setTheme, theme } = useNextTheme();
  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="flex items-center justify-end gap-6">
    <button
      onClick={handleTheme}
      className="flex items-center justify-center"
    >
      <Image
        src={theme === "light" ? iconMoon : iconSun}
        alt="theme toggle"
        width={25}
        height={25}
      />
    </button>
    </div>
  );
};

export default Theme; 