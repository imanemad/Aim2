"use client";

import { useRouter } from "next/navigation";
import BiArrowRightCircle from "../icons/BiArrowRightCircle";

interface FormHeaderProps {
    title: string | undefined;
    children?: React.ReactNode;
}

export default function FormHeader({ title = "", children }: FormHeaderProps) {
    const router = useRouter();

    return (
        <div className="FlexBetween mx-2">
            <button className="Titr" onClick={() => router.back()}>
                <BiArrowRightCircle size={18}/>
                <div>{title}</div>
            </button>

            <div className="flex gap-4 mb-3">
                {children}
            </div>
        </div>
    );
}
