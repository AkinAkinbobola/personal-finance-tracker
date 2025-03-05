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

export const downloadFile = (response: any, filename: string) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}