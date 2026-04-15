import { CreateDoctorPayload, DoctorListResponse, DoctorResponse } from "../types/doctor.type";
import { api } from "./api";

/** GET /doctors/getalldoctors — list all approved doctors (public) */
export const getAllDoctors = () => {
    return api.get<DoctorListResponse>("/doctors/getalldoctors");
};

/** GET /doctors/me — get logged-in doctor's profile (auth + doctor role) */
export const getMyDoctorProfile = () => {
    return api.get<DoctorResponse>("/doctors/me");
};

/** POST /doctors — create doctor profile (auth + doctor role) */
export const createDoctorProfile = (payload: CreateDoctorPayload) => {
    return api.post<DoctorResponse>("/doctors", payload);
};
