"use client"
import Link from "next/link";
import toast from "react-hot-toast";
import FormHeader from "@/components/Form/FormHeader";
import { useParams, useRouter } from "next/navigation";
import { showConfirmToast } from "@/components/Form/ConfirmToast";
import { useQueryClient } from "@tanstack/react-query";  // 👈 اضافه شد
import BiGear from "@/components/icons/BiGear";
import BiTrash from "@/components/icons/BiTrash";
import { useLoading } from "@/context/LoadingContext";
import { useGetBankQuery } from "@/services/banks/hooks";
import { deleteBankAction } from "@/actions/banks/delete.action";
import { banksKeys } from "@/services/banks/banks.queryKeys";
import BiArrowLeft from "@/components/icons/BiArrowLeft";

export default function Page() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const router = useRouter(); // ۲. مقداردهی اولیه useRouter
    const queryClient = useQueryClient(); // 👈 کنترل کش RQ
    const { showLoader, hideLoader } = useLoading();
    const { data: bank, isLoading, isError, error } = useGetBankQuery(id);

    if (isError) {
        toast.error(error.message);
        return <div className="ErrorState">خطا در بارگذاری اطلاعات بانک.</div>;
    }

    const handleDelete = () => {
        if (bank && Number(bank.balance) > 0) {
            toast.error("برای حذف باید موجودی صندوق صفر باشد");
            return;
        }
        showConfirmToast({
            message: "آیا مطمئن هستید از حذف این صندوق؟",
            onConfirm: async () => {
                showLoader();
                const result = await deleteBankAction(id);
                hideLoader()
                if (result.success) {
                    toast.success(result.message);
                    queryClient.invalidateQueries({ queryKey: banksKeys.list() });
                    router.push("/application/dashboard");
                } else if (result.message) {
                    toast.error(result.message);
                }
            },
        });
    };

    return (
        <div className="Container">
            <FormHeader title="صندوق">
                <Link href={`/application/dashboard/${id}/edit-bank`} >
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
                        <div className="space-y-3 text-center p-5">
                            <div className="text-xl!">{bank?.bankName}</div>
                            <div className="text-xl!">{bank?.balance.toLocaleString()}</div>
                        </div>
                    </>
                }
            </div>
            <div className="m-2 pt-2! text-blue-500 FlexG8 border-b w-fit">
                <div>تراکنشهای مرتبط</div>
                <BiArrowLeft/>
            </div>
        </div>
    )
}
