/* Generic API response wrapper — matches backend ApiResponse class */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}
