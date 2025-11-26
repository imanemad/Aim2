"use client";

import BiSearch from "@/components/icons/BiSearch";
import { baseFrontURL } from "@/lib/config";
import { useGetContactsQuery } from "@/services/contacts/hooks";
import Link from "next/link";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function Contacts() {
  const { 
    data: contacts,
    isLoading,      
    isError,        
    error           
  } = useGetContactsQuery();

  const [query, setQuery] = useState("");

  // فیلتر شده‌ها
  const filteredContacts = useMemo(() => {
    if (!contacts) return [];
      const q = query.trim().toLowerCase();

    if (!q) return contacts;

    return contacts.filter(item => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q)
      );
    });
  }, [contacts, query]);

  // ۳. مدیریت صریح خطا
  if (isError) {
      toast.error(error.message); 
      return <div className="ErrorState">خطا در بارگذاری مخاطبین.</div>
  }

  return (
    <div className="Container">
      <div className="FlexBetween">
        <div className="Search">
          <input
            type="text"
            placeholder="جستجوی مخاطب"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <BiSearch size={19} />
        </div>

        <Link href="/application/contacts/new" className="Btn Btn-Black">
          مخاطب جدید
        </Link>
      </div>

      <div className="Contact">
        {isLoading ? (<div className="p-2">Loading...</div>) : (
          <>
            {filteredContacts?.map((item) => (
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
