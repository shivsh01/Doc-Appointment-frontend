import { AuthResponse, LoginPayload, RegisterPayload } from "../types/auth.type";
import { api } from "./api";

export const Register = (payload: RegisterPayload) => {
    return api.post<AuthResponse>("/auth/register", payload); 
}

export const Login = (data: LoginPayload) => {
    return api.post<AuthResponse>("/auth/login", data); 
}