"use client";

import { baseFrontURL } from "@/lib/config";
import { useGetContacts } from "@/services/contacts/hooks";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

export default function Contacts() {
  const { data: contacts, loading } = useGetContacts();

  return (
    <div className="Container">
      <div className="FlexBetween">
        <div className="Search">
          <input type="text" placeholder="جستجوی مخاطب" />
          <FiSearch size={20} />
        </div>
        <Link href="/application/contacts/new" className="Btn Btn-Black">
          مخاطب جدید
        </Link>
      </div>

      <div className="Contact">
        {loading ? (<div className="p-2">Loading...</div>) : (
          <>
            {contacts.map((item) => (
              <Link href={`${baseFrontURL}/application/contacts/${item.id}`} className="Item" key={item.id}>
                <div>{item.name}</div>
                <div className="En">{item.phone}</div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
