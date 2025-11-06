"use client"
import Link from "next/link";
import toast from "react-hot-toast";
import FormHeader from "@/components/Form/FormHeader";
import { useParams, useRouter } from "next/navigation";
import { showConfirmToast } from "@/components/Form/ConfirmToast";
import { BsTrash } from "react-icons/bs";
import { PiGearSixLight } from "react-icons/pi";
import { useGetContactQuery } from "@/services/contacts/hooks";
import { deleteContactAction } from "@/actions/contacts/delete.action";
import { useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";  // 👈 اضافه شد
import { contactsKeys } from "@/services/contacts/contacts.queryKeys"; // 👈 کلیدهای کش

export default function Page() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const router = useRouter(); // ۲. مقداردهی اولیه useRouter
    const queryClient = useQueryClient(); // 👈 کنترل کش RQ
    
    const { data: contact, isLoading, isError, error } = useGetContactQuery(id);

    const [isPending, startTransition] = useTransition();

    if (isError) {
        toast.error(error.message);
        return <div className="ErrorState">خطا در بارگذاری اطلاعات مخاطب.</div>;
    }

    const handleDelete = () => {
        showConfirmToast({
            message: "آیا مطمئن هستید از حذف این مخاطب؟",
            onConfirm: () => {
                startTransition(async () => {
                const result = await deleteContactAction(id);

                if (result.success) {
                    toast.success(result.message);
                    queryClient.invalidateQueries({ queryKey: contactsKeys.list() });
                    router.push("/application/contacts");
                } else if (result.message) {
                    toast.error(result.message);
                }
                });
            },
        });
    };

    return (
        <div className="Container">
            <FormHeader title="طرف حساب">
                <Link href={`/application/contacts/${id}/edit`} >
                    <PiGearSixLight size={21} className="text-blue-600"/>
                </Link>
                <BsTrash size={19} 
                    className={`text-red-500 Cursor mt-px ${isPending ? 'opacity-50 pointer-events-none' : ''}`} 
                    onClick={handleDelete}/>
            </FormHeader>
            <div className="Card ">
                {isLoading 
                    ? <div>Loading...</div>
                    :<>
                        <small className="Title">مشخصات</small>
                        <div className="space-y-3 Details">
                            <div>{contact?.name}</div>
                            <div className="">{contact?.phone}</div>
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
