"use client";

import { useState } from "react";
import BiChevronDown from "@/components/icons/BiChevronDown";
import Link from "next/link";

interface SelectionProps<T> {
    required?: boolean;
    label?: string;
    items: T[];
    selectedItem: T | null;
    href: string
    getLabel: (item: T) => string;
    onSelect: (item: T) => void;
}

export default function Selection<T>({
    required,
    label,
    items,
    selectedItem,
    href,
    getLabel,
    onSelect,
}: SelectionProps<T>) {

    const [isOpen, setOpen] = useState(false);

    return (
        <section className="Selection">
            
            {label && <label>{required && <span className="text-red-500">*</span>} {label}</label>}

            <div className="Selection-Btn" onClick={() => setOpen(true)}>
                <div>{selectedItem ? getLabel(selectedItem) : "انتخاب کنید"}</div>
                <BiChevronDown />
            </div>

            <div className={`Selection-List ${isOpen ? "Show" : ""}`}>
                <div className="Container">
                    {items.map((item, i) => (
                        <small
                        className="Item"
                        key={i}
                        onClick={() => {
                            onSelect(item);
                            setOpen(false);
                        }}
                        >
                            {getLabel(item)}
                        </small>
                    ))}
                </div>

                <div className="border-t border-t-gray-300! flex justify-end">
                    <Link href={href} className="Btn Btn-Blue my-2! mx-3! text-sm!">
                        ثبت جدید
                    </Link>
                </div>
            </div>

            <div
                className={`Bg-Close ${isOpen ? "Show" : ""}`}
                onClick={() => setOpen(false)}
            />
        </section>
    );
}
