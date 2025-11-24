// src/app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CategoryType } from "@/generated/enums";

// GET /api/categories?type=deposit
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type"); // optional: deposit / withdraw

        let where = {};
        if (type === "deposit") where = { type: CategoryType.deposit };
        else if (type === "withdraw") where = { type: CategoryType.withdraw };

        const categories = await prisma.category.findMany({ where });

        return NextResponse.json(categories);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// POST /api/categories
export async function POST(req: NextRequest) {
    try {
        const { name, type, userId } = await req.json();

        if (!name || !type) {
        return NextResponse.json(
            { error: "name و type الزامی است" },
            { status: 400 }
        );
        }

        const category = await prisma.category.create({
        data: {
            id: crypto.randomUUID(),
            name,
            type,
            userId: userId || null, // optional
        },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطا در ذخیره دسته‌بندی";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
