import { useQuery } from "@tanstack/react-query";
import { categoriesKeys } from "./categories.queryKeys";
import { getCategories } from "../data-fetchers/categories.fetchers";

export const useGetCategoriesQuery = (type?: string) => {
    return useQuery({
        queryKey: categoriesKeys.list(type),
        queryFn: () => getCategories(type),
        staleTime: 5 * 60 * 1000,
    });
};

