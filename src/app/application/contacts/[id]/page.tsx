"use client"
import { deleteContact, getContact } from "@/services/contacts/endPoints";
import { IPeople } from "@/services/contacts/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { showConfirmToast } from "@/components/Form/ConfirmToast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import FormHeader from "@/components/Form/FormHeader";
import { BsTrash } from "react-icons/bs";
import { PiGearSixLight } from "react-icons/pi";

export default function Page() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const [data, setData] = useState<Partial<IPeople> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        async function load() {
            setLoading(true);
            setError(null);
            try {
                const data = await getContact(id);
                setData(data);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "خطای نامشخص";
                setError(message);
                toast.error(message);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [id]);

    const handleDelete = (id: string) => {
        showConfirmToast({
            message: "آیا مطمئن هستید از حذف این مخاطب؟",
            onConfirm: async () => {
                await deleteContact(id);
                router.push("/application/contacts");
            },
        });
    };

    return (
        <div className="Container">
            <FormHeader title="طرف حساب">
                <Link href={`/application/contacts/${id}/edit`} >
                    <PiGearSixLight size={21} className="text-blue-600"/>
                </Link>
                <BsTrash size={19} className="text-red-500 Cursor mt-px" onClick={() => handleDelete(id)}/>
            </FormHeader>
            <div className="Card ">
                {loading 
                    ? <div>Loading...</div>
                    :<>
                        <small className="Title">مشخصات</small>
                        <div className="space-y-3 Details">
                            <div>{data?.name}</div>
                            <div className="">{data?.phone}</div>
                        </div>
                    </>
                }
            </div>
            <div className="Card">
                <div className="FlexBetween pb-0.5">
                    <small className="Title">وضعیت حساب</small>
                    <Link href="/application/new/deposit" className="text-blue-500! text-[12.5px]! pb-1">
                        تسویه حساب
                    </Link>
                </div>
                <div className="Details FlexBetween">
                    <div>بدهکار</div>
                    <div className="font-bold pt-1">4.120.000</div>
                </div>
            </div>
            <div className="Card">
                <small className="Title">تراکنشات</small>
                <div className="space-y-3 Details">
                    <div>تراکنشی ثبت نشده</div>
                </div>
            </div>
        </div>
    )
}
