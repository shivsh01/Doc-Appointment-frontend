import { CreateDoctorPayload, DoctorListResponse, DoctorResponse, UpdateDoctorPayload, UpdateSchedulePayload, DoctorPatientsResponse, DoctorDashboardStatsResponse } from "../types/doctor.type";
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

/** PATCH /doctors/me — update logged-in doctor's profile */
export const updateDoctorProfile = (payload: UpdateDoctorPayload) => {
    return api.patch<DoctorResponse>("/doctors/me", payload);
};

/** PATCH /doctors/me/schedule — update logged-in doctor's schedule */
export const updateDoctorSchedule = (payload: UpdateSchedulePayload) => {
    return api.patch<DoctorResponse>("/doctors/me/schedule", payload);
};

/** GET /doctors/:id — get public doctor profile by ID */
export const getPublicDoctor = (id: string) => {
    return api.get<DoctorResponse>(`/doctors/${id}`);
};

/** GET /doctors/patients — get logged-in doctor's unique patients */
export const getDoctorPatients = () => {
    return api.get<DoctorPatientsResponse>("/doctors/patients");
};

/** GET /doctors/dashboard — get logged-in doctor's stats */
export const getDoctorDashboardStats = () => {
    return api.get<DoctorDashboardStatsResponse>("/doctors/dashboard");
};
