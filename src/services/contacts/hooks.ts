import { useEffect, useState } from "react";
import { IPeople } from "./types";
import { getContacts } from "./endPoints";

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
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("خطای نامشخص");
                }
            }
            finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return { data, loading, error };
};
