import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/contacts/:id
export async function GET(req: NextRequest) {
    try {
        const { pathname } = new URL(req.url);
        const id = pathname.split("/").pop();
        if (!id) return NextResponse.json({ error: "ID الزامی است" }, { status: 400 });

        const contact = await prisma.contact.findUnique({ where: { id } });
        if (!contact) return NextResponse.json({ error: "Contact پیدا نشد" }, { status: 404 });

        return NextResponse.json(contact);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// PUT /api/contacts/:id
export async function PUT(req: NextRequest) {
    try {
        const { pathname } = new URL(req.url);
        const id = pathname.split("/").pop();
        if (!id) return NextResponse.json({ error: "ID الزامی است" }, { status: 400 });

        const data = await req.json();
        const updated = await prisma.contact.update({ where: { id }, data });
        return NextResponse.json(updated);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای بروزرسانی";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// DELETE /api/contacts/:id
export async function DELETE(req: NextRequest) {
    try {
        const { pathname } = new URL(req.url);
        const id = pathname.split("/").pop();
        if (!id) return NextResponse.json({ error: "ID الزامی است" }, { status: 400 });

        await prisma.contact.delete({ where: { id } });
        return NextResponse.json({ message: "حذف شد" });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای حذف";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
