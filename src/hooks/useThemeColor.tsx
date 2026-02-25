import { useEffect } from "react";

export type Theme = "light" | "dark";

export function setThemeColorMeta(color: string) {
  let meta = document.head.querySelector('meta[name="theme-color"][data-theme-meta="true"]') as HTMLMetaElement | null;

  if (!meta) {
    meta = document.head.querySelector('meta[name="theme-color"]:not([media])') as HTMLMetaElement | null;
  }

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    meta.setAttribute("data-theme-meta", "true");
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", color);
}


export default function useThemeColor(theme: Theme) {
  useEffect(() => {
    const color = theme === "dark" ? "#0b1220" : "#ffffff";
    setThemeColorMeta(color);

  }, [theme]);
}