"use client";
import toast from "react-hot-toast";
import InputText from "@/components/Form/InputText";
import FormHeader from "@/components/Form/FormHeader";
import { useParams, useRouter } from "next/navigation";
import { ContactFormValues, contactSchema } from "@/services/contacts/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetContactQuery } from "@/services/contacts/hooks";
import { updateContactAction } from "@/actions/contacts/update.action";
import { contactsKeys } from "@/services/contacts/contacts.queryKeys";

export default function Page() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const { data: contact, isError, error } = useGetContactQuery(id);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (contact) {
      setValue("name", contact.name);
      setValue("phone", contact.phone);
    }
  }, [contact, setValue]);

  if (isError) {
    toast.error(error.message);
    return <div className="ErrorState">خطا در بارگذاری اطلاعات مخاطب.</div>;
  }

  const onSubmit = (formData: ContactFormValues) => {
    startTransition(async () => {
      const result = await updateContactAction(id, { ...formData, userId: 1 });

      if (result.success) {
        toast.success(result.message!);

        queryClient.invalidateQueries({ queryKey: contactsKeys.list() });
        queryClient.invalidateQueries({ queryKey: contactsKeys.detail(id) });

        router.push("/application/contacts");
      } else {
        toast.error(result.message || "خطا در ذخیره اطلاعات");
      }
    });
  };

  return (
    <div className="Container">
      <FormHeader title="ویرایش مخاطب"/>

      <form onSubmit={handleSubmit(onSubmit)} className="Form">
        <InputText
          label="نام مخاطب"
          {...register("name")}
          error={errors.name?.message}
          disabled={isPending}
        />

        <InputText
          label="شماره تماس"
          {...register("phone")}
          error={errors.phone?.message}
          className="En"
          disabled={isPending}
        />

        <div className="text-end Form-Item">
          <button
            className={`Btn Btn-Black m-0 mt-4 ${isPending ? "opacity-50" : ""}`}
            type="submit"
            disabled={isPending}
          >
            {isPending ? "در حال ذخیره..." : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
}
