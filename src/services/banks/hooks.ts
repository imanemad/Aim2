import { useQuery } from "@tanstack/react-query";
import { banksKeys } from "./banks.queryKeys";
import { IBank } from "./types";
import { getBank, getBanks } from "../data-fetchers/banks.fetchers";

export const useGetBanksQuery = () => {
    return useQuery({
        queryKey: banksKeys.list(), 
        queryFn: getBanks,
        staleTime: 5 * 60 * 1000,
    });
};

export const useGetBankQuery = (id: string) => {
    return useQuery<IBank, Error>({ 
        queryKey: banksKeys.detail(id),
        queryFn: () => getBank(id),
        enabled: !!id, 
    });
};