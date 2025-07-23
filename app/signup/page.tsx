import { AuthForm } from '@/components/auth-form';

export default function SignUp() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Crear cuenta</h1>
        <AuthForm mode="signup" />
      </div>
    </div>
  )
}