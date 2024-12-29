import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hslToHex = (hsl: string) => {
  const [h, s, l] = hsl.match(/\d+/g)!.map(Number);
  const a = (s * Math.min(l, 100 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round((255 * color) / 100)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const changeHslHueByAmount = (hsl: string, amount: number) => {
  const [h, s, l] = hsl.match(/\d+/g)!.map(Number);
  const newHue = (h + amount) % 360;
  return `hsl(${newHue}, ${s}%, ${l}%)`;
};
