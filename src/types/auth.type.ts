export enum Role {
    DOCTOR = "DOCTOR",
    PATIENT = "PATIENT",
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    role: Role;
}

export interface LoginPayload {
    email: string;
    password: string;
}
export interface AuthData {
    token: string;
    user: User;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: AuthData;
}
