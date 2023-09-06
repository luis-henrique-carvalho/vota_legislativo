import React from "react";
import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle: any = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex flex-col gap-2">
      <Switch isSelected={theme === "dark"} onValueChange={handleThemeToggle} />
    </div>
  );
}
