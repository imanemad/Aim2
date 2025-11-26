"use client";
import FormHeader from "@/components/Form/FormHeader";
import BiDashSquareFill from "@/components/icons/BiDashSquareFill";
import BiPlusCircleFill from "@/components/icons/BiPlusSquareFill";
import BiGear from "@/components/icons/BiGear";
// import BiTrash from "@/components/icons/BiTrash";
import { useGetTransactionQuery } from "@/services/transactions/hooks";
import moment from "moment-jalaali";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { showConfirmToast } from "@/components/Form/ConfirmToast";
import { deleteTransactionAction } from "@/actions/transactions/delete.action";
import { useLoading } from "@/context/LoadingContext";
import { useQueryClient } from "@tanstack/react-query";
import { contactsKeys } from "@/services/contacts/contacts.queryKeys";
import { transactionsKeys } from "@/services/transactions/transactions.queryKeys";
import { banksKeys } from "@/services/banks/banks.queryKeys";
import BiTrash from "@/components/icons/BiTrash";

export default function Page() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const router = useRouter();
    const queryClient = useQueryClient();
    const { showLoader, hideLoader } = useLoading();
    const {
        data: transaction,
        isLoading,
        isError,
        error,
    } = useGetTransactionQuery(id);

    if (isError) {
        toast.error(error.message);
        return <div className="ErrorState">خطا در بارگذاری اطلاعات مخاطب.</div>;
    }

    const handleDelete = () => {
        showConfirmToast({
            message: "آیا مطمئن هستید از حذف این تراکنش؟",
            onConfirm: async () => {
                showLoader();
                const result = await deleteTransactionAction(id);
                hideLoader()
                if (result.success) {
                    toast.success(result.message);
                    queryClient.invalidateQueries({ queryKey: banksKeys.list() });
                    if (transaction?.contactId) {
                        queryClient.invalidateQueries({
                            queryKey: contactsKeys.detail(transaction.contactId),
                        });
                    }
                    queryClient.invalidateQueries({ queryKey: transactionsKeys.detail(id) });
                    queryClient.invalidateQueries({ queryKey: transactionsKeys.list() });
                    router.push("/application/list");
                } else if (result.message) {
                    toast.error(result.message);
                }
            },
        });
    };

    return (
        <div className="Container">
        <FormHeader title="مشخصات">
            <Link href={`/application/contacts/${id}/edit`}>
            <BiGear size={18} className="text-blue-600 mt-px" />
            </Link>
            <button onClick={handleDelete}>
                <BiTrash size={19} className="text-red-500 Cursor"/>
            </button>
        </FormHeader>
        <div className="Card ">
            {isLoading ? (
                <div>Loading...</div>
                ) : (
                <>
                    <div className="space-y-2 py-3">

                        <div className="Transaction-Title">
                            <div>
                            <div className="FlexG8">
                                {transaction?.type === "deposit" ? (
                                <BiPlusCircleFill className="text-green-600!" size={15} />
                                ) : (
                                <BiDashSquareFill className=" text-red-600!" size={15} />
                                )}
                                <div>
                                {transaction?.type === "deposit"
                                    ? "واریز به حساب"
                                    : "برداشت از حساب"}
                                </div>
                            </div>
                            </div>
                            <div>{transaction?.amount.toLocaleString()}</div>
                        </div>
                        <div className="Details-Transaction space-y-2">
                            <div className="FlexBetween Row">
                                <div className="Q">تاریخ</div>
                                <div>{moment(transaction?.date).format("jYYYY/jMM/jDD")}</div>
                            </div>
                            <div className="FlexBetween Row">
                                <div className="Q">نام بانک / صندوق</div>
                                <div>{transaction?.bankName}</div>
                            </div>
                            <div className="FlexBetween Row">
                                <div className="Q">موجودی</div>
                                <div>{transaction?.lastBalanceBank.toLocaleString()}</div>
                            </div>
                            {transaction?.contactName != null && (
                                <div className="FlexBetween Row">
                                    <div className="Q">طرف حساب</div>
                                    <div>{transaction?.contactName}</div>
                                </div>
                            )}
                            <div className="Footer FlexBetween">
                                <div className="text-gray-400 ">بابت</div>
                                <div className="space-y-2 opacity-60">
                                    <div className="text-end">{transaction?.categoryName}</div>
                                    <div className="text-end">{transaction?.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                )}
            </div>
        </div>
    );
}
