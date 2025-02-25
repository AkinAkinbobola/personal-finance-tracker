import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const capitalize = (word: String) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2
  }).format(amount)
}
