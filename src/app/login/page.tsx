import { LoginForm } from "@/features/auth/components/LoginForm";

interface LoginPageProps {
  searchParams: Promise<{ reason?: string | string[] }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { reason } = await searchParams;
  const normalizedReason = Array.isArray(reason) ? reason[0] : reason;

  return <LoginForm reason={normalizedReason} />;
}
