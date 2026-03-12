import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes using clsx and tailwind-merge.
 * This utility allows for conditional classes and ensures that
 * Tailwind's cascading rules are respected by merging conflicting classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
