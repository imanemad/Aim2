import { useQuery } from "@tanstack/react-query";
import { transactionsKeys } from "./transactions.queryKeys";
import { ITransaction } from "./types";
import { getTransaction, getTransactions } from "../data-fetchers/transactions.fetchers";

export const useGetTransactionsQuery = () => {
    return useQuery({
        queryKey: transactionsKeys.list(), 
        queryFn: getTransactions,
        staleTime: 5 * 60 * 1000,
    });
};

export const useGetTransactionQuery = (id: string) => {
    return useQuery<ITransaction, Error>({ 
        queryKey: transactionsKeys.detail(id),
        queryFn: () => getTransaction(id),
        enabled: !!id, 
    });
};