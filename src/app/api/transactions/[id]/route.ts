import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ITransactionWithRelations } from "@/services/transactions/types";

// GET /api/transactions/[id]
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
    ) {
    try {
        const params = await context.params; // ⚡ unwrap پارامتر
        const id = params.id;

        if (!id)
        return NextResponse.json(
            { error: "id is required" },
            { status: 400 }
        );

        const transaction = await prisma.transaction.findUnique({
            where: { id },
            include: {
                category: true,
                bank: true,
                contact: true,
            },
        });

        if (!transaction)
        return NextResponse.json(
            { error: "Transaction not found" },
            { status: 404 }
        );

        const result: ITransactionWithRelations = {
            id: transaction.id,
            type: transaction.type,
            categoryName: transaction.category.name,
            bankName: transaction.bank.bankName,
            bankId: transaction.bankId,         // اضافه شد
            lastBalanceBank: transaction.lastBalanceBank,
            contactName: transaction.contact?.name || null,
            contactId: transaction.contactId,   // اضافه شد
            amount: transaction.amount,
            description: transaction.description || undefined,
            date: transaction.date.toISOString(),
        };

        return NextResponse.json(result);
    } catch (error: unknown) {
        const message =
        error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// DELETE /api/transactions/[id]
const NEED_CONTACT = ["1001", "1002", "2001", "2002"];
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const transaction = await prisma.transaction.findUnique({
            where: { id },
            include: {
                bank: true,
                contact: true,
                category: true,
            },
        });

        // console.log(transaction)

        if (!transaction) {
            return NextResponse.json(
                { error: "تراکنش یافت نشد" },
                { status: 404 }
            );
        }

        await prisma.$transaction(async (tx) => {
            // 1️⃣ Undo بانک
            const undoBankBalance =
                transaction.type === "deposit"
                    ? transaction.bank.balance - transaction.amount
                    : transaction.bank.balance + transaction.amount;

            await tx.bank.update({
                where: { id: transaction.bankId },
                data: { balance: undoBankBalance },
            });

            // 2️⃣ Undo مخاطب (اگر دسته‌بندی باید مخاطب را تغییر می‌داد)
            if (transaction.contactId && NEED_CONTACT.includes(transaction.categoryId)) {
                const contact = transaction.contact!;
                const change = transaction.type === "deposit" ? -transaction.amount : transaction.amount;
                const undoContactBalance = (contact.balance || 0) - change;

                await tx.contact.update({
                    where: { id: transaction.contactId },
                    data: { balance: undoContactBalance },
                });
            }

            // 3️⃣ حذف تراکنش
            await tx.transaction.delete({
                where: { id },
            });
        });

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "خطای ناشناخته";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// PUT /api/transactions/[id]
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();

        const updated = await prisma.transaction.update({
            where: { id: params.id },
            data: {
                ...body,
            },
        });

        return NextResponse.json(updated);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "خطای ناشناخته";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
