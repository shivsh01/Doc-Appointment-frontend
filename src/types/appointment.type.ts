import { ApiResponse } from "./api.type";

/* ---- Appointment statuses ---- */
export type AppointmentStatus = "booked" | "completed" | "cancelled" | "no_show";
export type PaymentStatus = "pending" | "paid";

/* ---- Appointment model ---- */
export interface Appointment {
  _id: string;
  doctorId: any;
  patientId: any;
  date: string;
  time: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

/* ---- Pagination ---- */
export interface PaginationQuery {
  limit?: number;
  cursor?: string;
  status?: AppointmentStatus;
  date?: string;
}

export interface PaginationMeta {
  nextCursor: string | null;
  limit: number;
}

/* ---- Book appointment payload ---- */
export interface BookAppointmentPayload {
  doctorId: string;
  date: string;
  time: string;
}

/* ---- API responses ---- */
export type SlotsResponse = ApiResponse<string[]>;

export type BookedAppointmentResponse = ApiResponse<{
  id: string;
  time: string;
  date: string;
}>;

export type AppointmentsListResponse = ApiResponse<{
  appointments: Appointment[];
  meta: PaginationMeta;
}>;
