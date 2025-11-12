export const banksKeys = {
    all: ['banks'] as const,
    list: () => [...banksKeys.all, 'list'] as const,
    detail: (id: string) => [...banksKeys.all, 'detail', id] as const,
};