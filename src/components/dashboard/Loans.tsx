import prisma from "@/lib/prisma";
import BiArrowLeft from "../icons/BiArrowLeft";
import Link from "next/link";

export default async function Loans() {
  const contacts = await prisma.contact.findMany({
    where: { userId: 1 },
    select: { balance: true },
  });

  const receivableAmount = contacts
    .filter(c => c.balance > 0)
    .reduce((sum, c) => sum + c.balance, 0);

  const payableAmount = contacts
    .filter(c => c.balance < 0)
    .reduce((sum, c) => sum + Math.abs(c.balance), 0);

  return (
    <div className="Loans">
      <Link href={`/application/dashboard/loans/receivable`} className="Debts">
        <div className="FlexBetween">
          <small>مبالغ بدهکاران</small>
          <BiArrowLeft size={16} className="bi bi-arrow-left"/>
        </div>
        <div className="En">
          {receivableAmount.toLocaleString()}
        </div>
      </Link>

      <Link href={`/application/dashboard/loans/payable`} className="Debts">
        <div className="FlexBetween">
          <small>مبالغ بستانکاران</small>
          <BiArrowLeft size={16} className="bi bi-arrow-left"/>
        </div>
        <div className="En">
          {payableAmount.toLocaleString()}
        </div>
      </Link>
    </div>
  );
}
