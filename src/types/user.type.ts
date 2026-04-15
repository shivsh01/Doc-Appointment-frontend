import { ApiResponse } from "./api.type";
import { User as AuthUser } from "./auth.type";

export interface UserProfile extends AuthUser {
    phone?: string;
    address?: string;
}

export interface UpdateUserPayload {
    name?: string;
    phone?: string;
    address?: string;
}

export type UserProfileResponse = ApiResponse<UserProfile>;
