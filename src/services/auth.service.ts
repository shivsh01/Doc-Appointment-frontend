import { AuthResponse, LoginPayload, RegisterPayload, ChangePasswordPayload } from "../types/auth.type";
import { ApiResponse } from "../types/api.type";
import { api } from "./api";

export const loginService = (data: LoginPayload) => {
    return api.post<AuthResponse>("/auth/login", data);
};

export const registerService = (payload: RegisterPayload) => {
    return api.post<AuthResponse>("/auth/register", payload);
};

export const changePasswordService = (payload: ChangePasswordPayload) => {
    return api.patch<ApiResponse<null>>("/auth/change-password", payload);
};