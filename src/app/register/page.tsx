import { AuthLayout } from "@/src/components/auth/AuthLayout";
import { RegisterForm } from "@/src/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Start your health journey today."
      subtitle="Create an account to book appointments, access your records, and get personalized care."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
