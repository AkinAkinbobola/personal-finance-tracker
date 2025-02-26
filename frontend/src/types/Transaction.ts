import {Category} from "@/types/Category.ts";

export interface Transaction {
    id: number
    amount: number
    description: string
    category: Category
    date: string
    type: string
}
