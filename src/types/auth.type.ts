import { ApiResponse } from "./api.type";

/* Roles match backend zod schema: lowercase "doctor" | "patient" */
export enum Role {
    DOCTOR = "doctor",
    PATIENT = "patient",
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

export type AuthResponse = ApiResponse<AuthData>;
