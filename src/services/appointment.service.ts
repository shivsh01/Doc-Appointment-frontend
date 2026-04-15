import {
    AppointmentsListResponse,
    BookAppointmentPayload,
    BookedAppointmentResponse,
    PaginationQuery,
    SlotsResponse,
    Appointment,
    AppointmentStatus
} from "../types/appointment.type";
import { ApiResponse } from "../types/api.type";
import { api } from "./api";

/** GET /appointments/slots?doctorId=X&date=YYYY-MM-DD — get available slots */
export const getAvailableSlots = (doctorId: string, date: string) => {
    return api.get<SlotsResponse>("/appointments/slots", {
        params: { doctorId, date },
    });
};

/** POST /appointments — book an appointment (auth required) */
export const bookAppointment = (payload: BookAppointmentPayload) => {
    return api.post<BookedAppointmentResponse>("/appointments", payload);
};

/** GET /appointments/my-appointments — patient's appointments (auth + patient role) */
export const getMyAppointments = (query: PaginationQuery = {}) => {
    return api.get<AppointmentsListResponse>("/appointments/my-appointments", {
        params: query,
    });
};

/** GET /appointments/doctor-appointments — doctor's appointments (auth + doctor role) */
export const getDoctorAppointments = (query: PaginationQuery = {}) => {
    return api.get<AppointmentsListResponse>("/appointments/doctor-appointments", {
        params: query,
    });
};

/** PATCH /appointments/:id/status — update appointment status */
export const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    return api.patch<ApiResponse<Appointment>>(`/appointments/${id}/status`, { status });
};
