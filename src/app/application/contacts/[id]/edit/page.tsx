"use client";
import toast from "react-hot-toast";
import InputText from "@/components/Form/InputText";
import FormHeader from "@/components/Form/FormHeader";
import { useParams, useRouter } from "next/navigation";
import { getContact, updateContact } from "@/services/contacts/endPoints";
import { ContactFormValues, contactSchema } from "@/services/contacts/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export default function Page() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  useEffect(() => {
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
  }, [id, setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await updateContact(id!, data);
      toast.success("مخاطب ویرایش شد!");
      router.push("/application/contacts");
    } catch {
      toast.error("خطا در ذخیره اطلاعات");
    }
  };

  return (
    <div className="Container">
      <FormHeader title="ویرایش مخاطب"/>

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
          <button className="Btn Btn-Black m-0 mt-4" type="submit">ویرایش</button>
        </div>
      </form>
    </div>
  );
}
