import { UpdateUserPayload, UserProfileResponse } from "../types/user.type";
import { api } from "./api";

/** GET /users/me — get logged-in user's profile */
export const getMyProfile = () => {
    return api.get<UserProfileResponse>("/users/me");
};

/** PATCH /users/me — update logged-in user's profile */
export const updateMyProfile = (payload: UpdateUserPayload) => {
    return api.patch<UserProfileResponse>("/users/me", payload);
};
