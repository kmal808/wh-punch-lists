import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeSwitch = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (currentTheme === "dark") {
    return (
      <SunIcon
        className="w-12 h-10 text-yellow-500"
        role="button"
        onClick={() => setTheme("light")}
      />
    );
  } else {
    return (
      <MoonIcon
        className="w-12 h-10 text-slate-600"
        role="button"
        onClick={() => setTheme("dark")}
      />
    );
  }
};

export default ThemeSwitch;
