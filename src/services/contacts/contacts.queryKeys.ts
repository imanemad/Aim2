export const contactsKeys = {
    all: ['contacts'] as const, // کلید اصلی برای لیست مخاطبین
    list: () => [...contactsKeys.all, 'list'] as const,
    detail: (id: string) => [...contactsKeys.all, 'detail', id] as const,
};