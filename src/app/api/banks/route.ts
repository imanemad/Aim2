import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/banks -> لیست همه بانک‌ها
export async function GET() {
    try {
        const banks = await prisma.bank.findMany();
        return NextResponse.json(banks);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// POST /api/banks -> ایجاد بانک جدید
export async function POST(req: NextRequest) {
    try {
        const { bankName, balance, userId } = await req.json();
        if (!bankName || !userId) {
        return NextResponse.json(
            { error: "bankName و userId الزامی است" },
            { status: 400 }
        );
        }

        const bank = await prisma.bank.create({
        data: {
            id: crypto.randomUUID(),
            bankName,
            balance: balance || 0,
            userId,
        },
        });

        return NextResponse.json(bank, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته هنگام ذخیره";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
