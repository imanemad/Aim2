export const categoriesKeys = {
    all: ['categories'] as const,
    list: (type?: string) => [...categoriesKeys.all, 'list', type] as const,
    detail: (id: string) => [...categoriesKeys.all, 'detail', id] as const,
};
