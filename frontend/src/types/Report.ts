export interface Report {
    date: string
    amount: number
    type: "INCOME" | "EXPENSE"
    category: string
}