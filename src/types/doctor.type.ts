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

/* ---- API responses ---- */
export type DoctorListResponse = ApiResponse<{ doctor: Doctor[] }>;
export type DoctorResponse = ApiResponse<{ doctor: Doctor }>;
