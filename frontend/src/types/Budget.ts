import {Category} from "@/types/Category.ts";

export interface Budget {
    id: number
    title: string
    totalAmount: number
    spentAmount: number
    month: string
    category: Category
}