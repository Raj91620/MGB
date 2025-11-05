import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { MGB_TO_USD, tonToMGB, mgbToUSD } from "@shared/constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency values - converts TON to MGB
 * Examples: 0.00033 → "33 MGB", 0.0002 → "20 MGB"
 */
export function formatCurrency(value: string | number, includeSymbol: boolean = true): string {
  const numValue = parseFloat(typeof value === 'string' ? value : value.toString());
  
  if (isNaN(numValue)) {
    return includeSymbol ? '0 MGB' : '0';
  }
  
  // Convert TON to MGB using shared constant
  const mgbValue = tonToMGB(numValue);
  
  const symbol = includeSymbol ? ' MGB' : '';
  return `${mgbValue.toLocaleString()}${symbol}`;
}

/**
 * Format task rewards - converts TON to MGB
 * Examples: 0.00033 → "33 MGB", 0.0002 → "20 MGB"
 */
export function formatTaskReward(value: string | number, includeSymbol: boolean = true): string {
  const numValue = parseFloat(typeof value === 'string' ? value : value.toString());
  
  if (isNaN(numValue)) {
    return includeSymbol ? '0 MGB' : '0';
  }
  
  // Convert TON to MGB using shared constant
  const mgbValue = tonToMGB(numValue);
  
  const symbol = includeSymbol ? ' MGB' : '';
  return `${mgbValue.toLocaleString()}${symbol}`;
}

/**
 * Convert MGB to USD
 * 100,000 MGB = $1.00
 */
export function formatMGBtoUSD(mgbAmount: number | string): string {
  const usd = mgbToUSD(mgbAmount);
  return usd.toFixed(2);
}

/**
 * Format TON values without converting to MGB
 * For admin panel and withdrawal displays
 * Examples: 0.0003 → "0.0003 TON", 1.5 → "1.5 TON"
 */
export function formatTON(value: string | number, includeSymbol: boolean = true): string {
  const numValue = parseFloat(typeof value === 'string' ? value : value.toString());
  
  if (isNaN(numValue)) {
    return includeSymbol ? '0 TON' : '0';
  }
  
  const symbol = includeSymbol ? ' TON' : '';
  return `${numValue.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 8 })}${symbol}`;
}
