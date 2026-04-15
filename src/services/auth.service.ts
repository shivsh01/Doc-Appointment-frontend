import { AuthResponse, LoginPayload, RegisterPayload } from "../types/auth.type";
import { api } from "./api";

export const loginService = (data: LoginPayload) => {
    return api.post<AuthResponse>("/auth/login", data);
};

export const registerService = (payload: RegisterPayload) => {
    return api.post<AuthResponse>("/auth/register", payload);
};