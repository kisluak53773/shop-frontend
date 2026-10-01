export const USER_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    CUSTOMER: 'customer',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];