import prisma from "@/lib/prisma";

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
      <div className="Debts">
        <small>مبالغ دریافتنی (بستانکاری)</small>
        <div className="En">
          {receivableAmount.toLocaleString()}
        </div>
      </div>

      <div className="Debts">
        <small>مبالغ پرداختنی (بدهکاری)</small>
        <div className="En">
          {payableAmount.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
