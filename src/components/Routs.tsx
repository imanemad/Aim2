"use client"

import { links } from "@/types/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Routs() {
    const path=usePathname()

    return (
        <div className="Routers">
            <div className="Container">
                {links.map(item => (
                    <Link href={item.href} 
                        className={path === item.href ? "active" : ""} 
                        key={item.title}
                        >
                            {item.icon}
                    </Link>
                ))}
            </div>
        </div>
    )
}
