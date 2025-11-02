"use client";
import { BsArrowRightCircle, BsTrash } from "react-icons/bs";

interface FormHeaderProps {
    isNew: boolean;
    onDelete?: () => void;
    title?: string;
}

export default function FormHeader({isNew,onDelete,title = "",}: FormHeaderProps) {
    return (
        <div className="FlexBetween mx-2">
        <button className="Titr" onClick={() => history.back()}>
            <BsArrowRightCircle size={18} />
            <div>{title}</div>
        </button>

        {!isNew && onDelete && (
            <button onClick={onDelete}>
                <BsTrash size={19} className="mb-2 text-red-500" />
            </button>
        )}
        </div>
    );
}
