"use client";
import toast from "react-hot-toast";

interface ConfirmToastProps {
    message: string;
    onConfirm: () => Promise<void> | void;
}

export function showConfirmToast({ message, onConfirm }: ConfirmToastProps) {
    toast(
        (t) => (
        <div className="flex flex-col gap-2 py-3">
            <div>{message}</div>
            <div className="flex gap-2 justify-end mt-2">
            <button
                className="Btn Btn-Black-Empty"
                onClick={() => toast.dismiss(t.id)}
            >
                لغو
            </button>
            <button
                className="Btn Btn-Red"
                onClick={async () => {
                try {
                    await onConfirm();
                    toast.success("عملیات با موفقیت انجام شد!", { duration: 2000 });
                } catch {
                    toast.error("خطا در انجام عملیات");
                }
                toast.dismiss(t.id);
                }}
            >
                بله
            </button>
            </div>
        </div>
        ),
        { duration: Infinity }
    );
}
