"use client";
import toast from "react-hot-toast";
import InputText from "@/components/Form/InputText";
import FormHeader from "@/components/Form/FormHeader";
import { useParams, useRouter } from "next/navigation";
import { createContact, deleteContact, getContact, updateContact } from "@/services/contacts/endPoints";
import { showConfirmToast } from "@/components/Form/ConfirmToast";
import { ContactFormValues, contactSchema } from "@/services/contacts/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export default function Page() {
  const { idOrNew } = useParams();
  const id = Array.isArray(idOrNew) ? idOrNew[0] : idOrNew;
  const isNew = id === "new";
  const router = useRouter();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  // دریافت اطلاعات در حالت ویرایش
  useEffect(() => {
    if (isNew) return;
    const loadContact = async () => {
      try {
        const data = await getContact(id!);
        setValue("name", data.name);
        setValue("phone", data.phone);
      } catch {
        toast.error("خطا در دریافت اطلاعات مخاطب");
      }
    };
    loadContact();
  }, [id, isNew, setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      if (isNew) {
        await createContact({ ...data, userId: 1 });
        toast.success("مخاطب ایجاد شد!");
      } else {
        await updateContact(id!, data);
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

      <form onSubmit={handleSubmit(onSubmit)} className="Form">
        <InputText
          label="نام مخاطب"
          {...register("name")}
          error={errors.name?.message}
        />

        <InputText
          label="شماره تماس"
          {...register("phone")}
          error={errors.phone?.message}
          className="En"
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
