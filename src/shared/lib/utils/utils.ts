import { clsx, type ClassValue } from "clsx";
function twMergeFallback(input: string) {
  if (!input) return "";
  const parts = input.split(/\s+/).filter(Boolean);
  const seen = new Set<string>();
  const resultReversed: string[] = [];

  
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    if (!seen.has(p)) {
      seen.add(p);
      resultReversed.push(p);
    }
  }

  return resultReversed.reverse().join(" ");
}

export function cn(...inputs: ClassValue[]) {
  const combined = clsx(inputs);
  return twMergeFallback(combined);
}
