"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, updateMyProfile } from "@/src/services/user.service";
import { UpdateUserPayload } from "@/src/types/user.type";
import { changePasswordService } from "@/src/services/auth.service";
import { ChangePasswordPayload } from "@/src/types/auth.type";

export const USER_KEYS = {
  me: ["user", "me"] as const,
};

export function useMyProfile() {
  return useQuery({
    queryKey: USER_KEYS.me,
    queryFn: () => getMyProfile().then((res) => res.data.data),
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateMyProfile(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: USER_KEYS.me }),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePasswordService(payload),
  });
}
