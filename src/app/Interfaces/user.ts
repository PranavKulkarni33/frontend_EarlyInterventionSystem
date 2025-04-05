export interface User {
    email: string;
    password: string;
    name?: string;
    role?: string;
    code?: string;
    showPassword?: boolean;
}
