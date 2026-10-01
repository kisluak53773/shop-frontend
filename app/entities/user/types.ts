import type { UserRole } from "./roles";

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    updated_at: Date;
    created_at: Date;
}