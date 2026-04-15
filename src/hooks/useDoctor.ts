"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllDoctors, getMyDoctorProfile, createDoctorProfile } from "@/src/services/doctor.service";
import { CreateDoctorPayload } from "@/src/types/doctor.type";

/* ---- Query keys (centralised to avoid stale-key bugs) ---- */
export const DOCTOR_KEYS = {
  all: ["doctors"] as const,
  me: ["doctor", "me"] as const,
};

/** Fetch all approved doctors (public) */
export function useDoctors() {
  return useQuery({
    queryKey: DOCTOR_KEYS.all,
    queryFn: () => getAllDoctors().then((res) => res.data.data.doctor),
  });
}

/** Fetch logged-in doctor's own profile */
export function useMyDoctorProfile() {
  return useQuery({
    queryKey: DOCTOR_KEYS.me,
    queryFn: () => getMyDoctorProfile().then((res) => res.data.data.doctor),
  });
}

/** Create doctor profile (onboarding) */
export function useCreateDoctorProfile() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDoctorPayload) => createDoctorProfile(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DOCTOR_KEYS.me });
    },
  });
}
