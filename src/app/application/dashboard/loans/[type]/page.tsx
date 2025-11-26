import FormHeader from "@/components/Form/FormHeader";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Page(props: { params: Promise<{ type: string }> }) {
    const { type } = await props.params;

    const isReceivable = type === "receivable";
    const isPayable = type === "payable";

    if (!isReceivable && !isPayable) {
        return <div>نوع صفحه معتبر نیست</div>;
    }

    const contacts = await prisma.contact.findMany({
        where: {
            userId: 1,
            balance: isReceivable ? { gt: 0 } : { lt: 0 }
        },
    });

    const titles: Record<string, string> = {
        receivable: "بدهکاران",
        payable: "بستانکاران",
    };
    const title = titles[type];

    return (
        <div className="Container">
            <FormHeader title={title}/>
            <div className="Contact">
                {contacts.length === 0 && <p className="Item">موردی یافت نشد.</p>}
                {contacts.map((item) => (
                    <Link
                        key={item.id}
                        href={`/application/contacts/${item.id}`}
                        className="Item"
                    >
                        <div>{item.name}</div>
                        <div className="En">{item.balance.toLocaleString()}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

