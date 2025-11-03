"use client";

import { BsArrowRightCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface FormHeaderProps {
    title: string;
    children?: React.ReactNode;
}

export default function FormHeader({ title = "", children }: FormHeaderProps) {
    const router = useRouter();

    return (
        <div className="FlexBetween mx-2">
            <button className="Titr" onClick={() => router.back()}>
                <BsArrowRightCircle size={18} />
                <div>{title}</div>
            </button>

            <div className="flex gap-4 mb-3">
                {children}
            </div>
        </div>
    );
}
