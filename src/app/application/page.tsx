import { linksAddItem } from '@/types/linksAddItem'
import Link from 'next/link'

export default function page() {
    return (
        <div className="Container">
            <div className="Add">
                <div className="Row">
                    {linksAddItem.map(item => (
                        <Link href={`/application/new/${item.url}`} className="Item" key={item.title}>
                            {item.icon}
                            <div>{item.title}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
