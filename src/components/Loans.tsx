import { ITransaction } from "@/types/transaction"

export default async function Loans() {
    const result = await fetch(`http://localhost:8008/transactions`)
    const allTransactions:ITransaction[] = await result.json()

    const { debtorTotal, creditorTotal } = allTransactions.reduce(
        (acc, t) => {
            if (t.type === "debtor") acc.debtorTotal += t.amount;
            else if (t.type === "creditor") acc.creditorTotal += t.amount;
            return acc;
        },
        { debtorTotal: 0, creditorTotal: 0 }
    );

    return (
        <div className="Loans">
            <div className="Debts">
                <small>مبالغ دریافتنی</small>
                <div className="En">{debtorTotal.toLocaleString()}</div>
            </div>
            <div className="Debts">
                <small>مبالغ پرداختنی</small>
                <div className="En">{creditorTotal.toLocaleString()}</div>
            </div>
        </div>
    )
}
