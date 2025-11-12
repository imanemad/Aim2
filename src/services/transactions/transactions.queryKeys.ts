export const transactionsKeys = {
    all: ['transactions'] as const,
    list: () => [...transactionsKeys.all, 'list'] as const,
    detail: (id: string) => [...transactionsKeys.all, 'detail', id] as const,
};