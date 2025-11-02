"use client";

import { IPeople } from "@/services/contacts/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import Link from "next/link";

export default function Page() {
  const { idOrNew } = useParams();
  const isNew = idOrNew === "new";
  const [contact, setContact] = useState<Partial<IPeople>>({
    name: "",
    phone: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (isNew) return;
    const getContact = async () => {
      const res = await fetch(`http://localhost:8008/contacts/${idOrNew}`);
      if (res.ok) {
        const data = await res.json();
        setContact(data);
      }
    };
    getContact();
  }, [idOrNew, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) {
      await fetch("http://localhost:8008/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, userId: 1 }),
      });
    } else {
      await fetch(`http://localhost:8008/contacts/${idOrNew}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
    }
    router.push("/application/contacts"); // برگشت به لیست
  };

  return (
    <div className="Container">
      <Link href="/application/contacts" className="Titr">
        <BsArrowRightCircle size={18} />
        <div>{isNew ? "ایجاد مخاطب" : "ویرایش مخاطب"}</div>
      </Link>

      <form className="Form" onSubmit={handleSubmit}>
        <div className="Form-Item">
          <label>نام مخاطب</label>
          <input
            type="text"
            value={contact.name ?? ""}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
        </div>

        <div className="Form-Item">
          <label>شماره تماس</label>
          <input
            type="text"
            className="En"
            value={contact.phone ?? ""}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          />
        </div>

        <div className="text-end Form-Item">
          {!isNew && (
            <button
              type="button" // ⚠️ حتما type="button" بذار تا فرم submit نشه
              className="Btn Btn-Red m-0 mt-4"
              onClick={async () => {
                if (
                  confirm("آیا مطمئن هستید که می‌خواهید این مخاطب را حذف کنید؟")
                ) {
                  await fetch(`http://localhost:8008/contacts/${idOrNew}`, {
                    method: "DELETE",
                  });
                  router.push("/application/contacts"); // برگشت به لیست بعد از حذف
                }
              }}
            >
              حذف
            </button>
          )}

          <button className="Btn Btn-Black m-0 mt-4" type="submit">
            {isNew ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
}
