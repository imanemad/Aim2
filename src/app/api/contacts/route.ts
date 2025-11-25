import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/contacts
export async function GET() {
    try {
        const contacts = await prisma.contact.findMany();
        return NextResponse.json(contacts);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// POST /api/contact
export async function POST(req: NextRequest) {
    try {
        const { name, phone, userId, balance } = await req.json();
        if (!name || !userId)
        return NextResponse.json({ error: "name و userId الزامی است" }, { status: 400 });

        const contact = await prisma.contact.create({
        data: { id: crypto.randomUUID(), name, phone, userId, balance },
        });

        return NextResponse.json(contact, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
