import { useQuery } from "@tanstack/react-query";
import { getContact, getContacts } from "../data-fetchers/contacts.fetchers"; // از فایل جدید fetcher
import { contactsKeys } from "./contacts.queryKeys";
import { IPeople } from "./types";

export const useGetContactsQuery = () => {
    return useQuery({
        queryKey: contactsKeys.list(), 
        queryFn: getContacts,
        staleTime: 5 * 60 * 1000, // داده تا ۵ دقیقه 'تازه' تلقی می‌شود
    });
};

export const useGetContactQuery = (id: string) => {
    return useQuery<IPeople, Error>({ // اضافه کردن نوع خطا برای صراحت
        queryKey: contactsKeys.detail(id),
        queryFn: () => getContact(id),
        // این کوئری را اجرا نکن اگر ID وجود ندارد
        enabled: !!id, 
    });
};