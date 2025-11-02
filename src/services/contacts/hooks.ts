import { useEffect, useState } from "react";
import { IPeople } from "./types";
import { getContact, getContacts } from "./endPoints";
import toast from "react-hot-toast";

export const useGetContacts = () => {
    const [data, setData] = useState<IPeople[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const data = await getContacts();
                setData(data);
                // toast.success("اطلاعات با موفقیت بارگذاری شد!");
            }catch (err: unknown) {
                const message = err instanceof Error ? err.message : "خطای نامشخص";
                setError(message);
                toast.error(message);
            }
            finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return { data, loading, error };
};



export const useGetContact = (id: string) => {
    const [data, setData] = useState<Partial<IPeople> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        async function load() {
        setLoading(true);
        setError(null);
        try {
            const data = await getContact(id);
            setData(data);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "خطای نامشخص";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
        }

        load();
    }, [id]);

    return { data, loading, error };
};
