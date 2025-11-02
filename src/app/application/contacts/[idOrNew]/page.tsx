"use client";

import { IPeople } from "@/services/contacts/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createContact, deleteContact, getContact, updateContact } from "@/services/contacts/endPoints";
import { showConfirmToast } from "@/components/ConfirmToast";
import FormInput from "@/components/Form/InputText";
import FormHeader from "@/components/Form/FormHeader";

export default function Page() {
  const { idOrNew } = useParams();
  const id = Array.isArray(idOrNew) ? idOrNew[0] : idOrNew;
  const isNew = id === "new";
  const [contact, setContact] = useState<Partial<IPeople>>({ name: "", phone: "" });
  const router = useRouter();

  useEffect(() => {
    if (isNew) return;

    const loadContact = async () => {
      try {
        const data = await getContact(id!);
        setContact(data);
      } catch {
        toast.error("خطا در دریافت اطلاعات مخاطب");
      }
    };
    loadContact();
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        await createContact({ ...contact, userId: 1 });
        toast.success("مخاطب ایجاد شد!");
      } else {
        await updateContact(id!, contact);
        toast.success("مخاطب ویرایش شد!");
      }
      router.push("/application/contacts");
    } catch {
      toast.error("خطا در ذخیره اطلاعات");
    }
  };

  const handleDelete = (id: string) => {
    showConfirmToast({
      message: "آیا مطمئن هستید از حذف این مخاطب؟",
      onConfirm: async () => {
        await deleteContact(id);
        router.push("/application/contacts");
      },
    });
  };

  return (
    <div className="Container">
      <FormHeader
        isNew={isNew}
        onDelete={() => handleDelete(id!)}
        title={isNew ? "مخاطب جدید" : "ویرایش مخاطب"}
      />

      <form className="Form" onSubmit={handleSubmit}>
        
        <FormInput 
          label="نام مخاطب"
          name="name"
          value={contact.name ?? ""}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />

        <FormInput 
          label="شماره تماس"
          name="phone"
          className="En"
          value={contact.phone ?? ""}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />

        <div className="text-end Form-Item">
          <button className="Btn Btn-Black m-0 mt-4" type="submit">
            {isNew ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
}
