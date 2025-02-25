import {Category} from "@/types/Category.ts";
import {Transaction} from "@/types/Transaction.ts";

export interface Budget {
    id: number
    title: string
    totalAmount: number
    spentAmount: number
    month: string
    category: Category
    transactions: Transaction[]
}