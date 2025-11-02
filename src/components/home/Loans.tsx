import { baseBackendURL } from "@/lib/config";
import { ITransaction } from "@/types/transaction"

export default async function Loans() {
    const res = await fetch(`${baseBackendURL}/transactions?_expand=category&_expand=contact`, {
        cache: "no-store",
    })
    const allTransactions: (ITransaction & {
        category: { id: number; name: string; type: string }
        contact?: { id: number; name: string }
    })[] = await res.json()

    const contactTransactions = allTransactions.filter(t => t.contactId)

    const payables = contactTransactions
        .filter(t => t.categoryId === 1) // "دریافت قرض"
        .reduce((sum, t) => sum + t.amount, 0)

    const receivables = contactTransactions
        .filter(t => t.categoryId === 4) // "پرداخت قرض"
        .reduce((sum, t) => sum + t.amount, 0)

    return (
        <div className="Loans flex gap-4">
        <div className="Debts bg-blue-100 p-4 rounded-xl">
            <small>مبالغ دریافتنی (بستانکاری)</small>
            <div className="En text-lg font-bold text-blue-700">
            {receivables.toLocaleString()}
            </div>
        </div>

        <div className="Debts bg-amber-100 p-4 rounded-xl">
            <small>مبالغ پرداختنی (بدهکاری)</small>
            <div className="En text-lg font-bold text-amber-700">
            {payables.toLocaleString()}
            </div>
        </div>
        </div>
    )
}
