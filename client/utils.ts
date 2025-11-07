import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { tonToMGB } from "../shared/constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency values - converts TON to MGB
 * Examples: 0.0001 → "50 MGB", 0.0002 → "100 MGB"
 * Note: This file is deprecated, use client/src/lib/utils.ts instead
 */
export function formatCurrency(value: string | number, includeSymbol: boolean = true): string {
  const numValue = parseFloat(typeof value === 'string' ? value : value.toString());
  
  if (isNaN(numValue)) {
    return includeSymbol ? '0 MGB' : '0';
  }
  
  // Convert TON to MGB
  const mgbValue = tonToMGB(numValue);
  
  const symbol = includeSymbol ? ' MGB' : '';
  return `${mgbValue.toLocaleString()}${symbol}`;
}
