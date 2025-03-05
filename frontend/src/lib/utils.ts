import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {format} from "date-fns";

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

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const toLocalDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
}