import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/transactions -> همه تراکنش‌ها با جزئیات
export async function GET() {
    try {
        const transactions = await prisma.transaction.findMany({
            include: {
                category: true,
                bank: true,
                contact: true,
            },
        });

        // Map کردن خروجی به شکل دلخواه
        const result = transactions.map((t) => ({
            id: t.id,
            type: t.type,
            categoryName: t.category.name,
            bankName: t.bank.bankName,
            lastBalanceBank: t.lastBalanceBank,
            contactName: t.contact?.name || null,
            amount: t.amount,
            description: t.description,
            date: t.date,
        }));

        return NextResponse.json(result);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته";
        return NextResponse.json({ error: message }, { status: 500 });
    }
};

// POST /api/transactions -> ایجاد تراکنش جدید
export async function POST(req: NextRequest) {
    try {
        const { userId, bankId, contactId, categoryId, type, amount, description, date } =
            await req.json();

        if (!userId || !bankId || !categoryId || !type || !amount)
        return NextResponse.json({ error: "اطلاعات الزامی است" }, { status: 400 });

        // 1️⃣ گرفتن بانک فعلی
        const bank = await prisma.bank.findUnique({ where: { id: bankId } });
        if (!bank) return NextResponse.json({ error: "Bank پیدا نشد" }, { status: 404 });

        // 2️⃣ محاسبه موجودی جدید
        let newBalance = bank.balance;
        if (type === "deposit") newBalance += amount;
        else if (type === "withdraw") newBalance -= amount;

        // 3️⃣ ایجاد تراکنش با lastBalanceBank
        const transaction = await prisma.transaction.create({
            data: {
                id: crypto.randomUUID(),
                userId,
                bankId,
                contactId,
                categoryId,
                type,
                amount,
                lastBalanceBank: newBalance,
                description,
                date: date ? new Date(date) : new Date(),
            },
        });

        // 4️⃣ بروزرسانی موجودی بانک
        await prisma.bank.update({
            where: { id: bankId },
            data: { balance: newBalance },
        });

        return NextResponse.json(transaction, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ذخیره تراکنش";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

