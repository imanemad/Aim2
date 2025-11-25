"use client"
import Link from "next/link";
import toast from "react-hot-toast";
import FormHeader from "@/components/Form/FormHeader";
import { useParams, useRouter } from "next/navigation";
import { showConfirmToast } from "@/components/Form/ConfirmToast";
import { useGetContactQuery } from "@/services/contacts/hooks";
import { deleteContactAction } from "@/actions/contacts/delete.action";
import { useQueryClient } from "@tanstack/react-query";  // 👈 اضافه شد
import { contactsKeys } from "@/services/contacts/contacts.queryKeys"; // 👈 کلیدهای کش
import BiGear from "@/components/icons/BiGear";
import BiTrash from "@/components/icons/BiTrash";
import { useLoading } from "@/context/LoadingContext";

export default function Page() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const router = useRouter(); // ۲. مقداردهی اولیه useRouter
    const queryClient = useQueryClient(); // 👈 کنترل کش RQ
    const { showLoader, hideLoader } = useLoading();
    const { data: contact, isLoading, isError, error } = useGetContactQuery(id);

    if (isError) {
        toast.error(error.message);
        return <div className="ErrorState">خطا در بارگذاری اطلاعات مخاطب.</div>;
    }

    const handleDelete = () => {
        showConfirmToast({
            message: "آیا مطمئن هستید از حذف این مخاطب؟",
            onConfirm: async () => {
                showLoader();
                const result = await deleteContactAction(id);
                hideLoader()
                if (result.success) {
                    toast.success(result.message);
                    queryClient.invalidateQueries({ queryKey: contactsKeys.list() });
                    router.push("/application/contacts");
                } else if (result.message) {
                    toast.error(result.message);
                }
            },
        });
    };

    return (
        <div className="Container">
            <FormHeader title="طرف حساب">
                <Link href={`/application/contacts/${id}/edit`} >
                    <BiGear size={18} className="text-blue-600 mt-px"/>
                </Link>
                <button onClick={handleDelete}>
                    <BiTrash size={19} className="text-red-500 Cursor"/>
                </button>
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
                    {contact?.balance != null && contact.balance !== 0 && (
                        <Link
                            href={`/application/new/${contact.balance > 0 ? "deposit" : "withdraw"}`}
                            className="text-blue-500! text-[12.5px]! pb-1"
                        >
                            تسویه حساب
                        </Link>
                    )}
                </div>
                <div className="Details FlexBetween">
                    <div>
                    {contact?.balance != null
                        ? contact.balance === 0
                        ? "تسویه"
                        : contact.balance > 0
                        ? "بدهکار"
                        : "بستانکار"
                        : "نامشخص"}
                    </div>
                    <div className="font-bold pt-1" dir="ltr">{contact?.balance.toLocaleString()}</div>
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
