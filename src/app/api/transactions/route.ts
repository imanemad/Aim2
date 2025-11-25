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

        // دسته‌بندی‌هایی که باعث می‌شوند موجودی مخاطب تغییر کند
        const NEED_CONTACT = ["1001", "1002", "2001", "2002"];

        const transactionResult = await prisma.$transaction(async (tx) => {
        // 1️⃣ بانک فعلی
        const bank = await tx.bank.findUnique({ where: { id: bankId } });
        if (!bank) throw new Error("Bank پیدا نشد");

        // 2️⃣ محاسبه موجودی جدید بانک
        const newBankBalance = type === "deposit" ? bank.balance + amount : bank.balance - amount;

        // 3️⃣ ایجاد تراکنش
        const transaction = await tx.transaction.create({
            data: {
            id: crypto.randomUUID(),
            userId,
            bankId,
            contactId,
            categoryId,
            type,
            amount,
            lastBalanceBank: newBankBalance,
            description,
            date: date ? new Date(date) : new Date(),
            },
        });

        // 4️⃣ بروزرسانی موجودی بانک
        await tx.bank.update({
            where: { id: bankId },
            data: { balance: newBankBalance },
        });

        // 5️⃣ اگر دسته‌بندی جزو ۴ مورد بود، موجودی مخاطب را بروزرسانی کن
        if (contactId && NEED_CONTACT.includes(categoryId)) {
            const contact = await tx.contact.findUnique({ where: { id: contactId } });
            if (!contact) throw new Error("مخاطب پیدا نشد");

            // نوع تراکنش برعکس بانک است
            const change = (type === "deposit" ? -amount : amount);

            await tx.contact.update({
                where: { id: contactId },
                data: { balance: (contact.balance || 0) + change },
            });
        }

        return transaction;
        });

        return NextResponse.json(transactionResult, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ذخیره تراکنش";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

