import { AuthButton } from '@/components/auth-button';
import { AuthForm } from '@/components/auth-form';

export default async function Login() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-6">Inicia sesión</h1>
        <AuthForm mode="login" />
        <div className="mt-6">
          <AuthButton />
        </div>
      </div>
    </div>
  )
}