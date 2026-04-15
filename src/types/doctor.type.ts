import { ApiResponse } from "./api.type";

/* ---- Doctor profile ---- */
export interface DoctorBreak {
  start: string;
  end: string;
}

export interface Doctor {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  specialization: string;
  experience: number;
  consultationFee: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
  maxBookingsPerDay: number;
  paymentRequired: boolean;
  breaks?: DoctorBreak[];
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ---- Create doctor payload ---- */
export interface CreateDoctorPayload {
  specialization: string;
  experience: number;
  consultationFee: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
  maxBookingsPerDay: number;
  paymentRequired: boolean;
  breaks?: DoctorBreak[];
}

/* ---- Update doctor payload ---- */
export interface UpdateDoctorPayload {
  specialization?: string;
  experience?: number;
  consultationFee?: number;
  paymentRequired?: boolean;
}

export interface UpdateSchedulePayload {
  startTime?: string;
  endTime?: string;
  slotDuration?: number;
  maxBookingsPerDay?: number;
  breaks?: DoctorBreak[];
}

export interface DoctorDashboardStats {
  totalAppointments: number;
  todayAppointments: number;
  completedAppointments: number;
  pendingAppointments: number;
  totalRevenue: number;
  totalPatients: number;
}

/* ---- API responses ---- */
export type DoctorListResponse = ApiResponse<{ doctor: Doctor[] }>;
export type DoctorResponse = ApiResponse<{ doctor: Doctor }>;
export type DoctorPatientsResponse = ApiResponse<{ patients: any[] }>; // Ideally use User interface
export type DoctorDashboardStatsResponse = ApiResponse<{ stats: DoctorDashboardStats }>;
