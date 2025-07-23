'use client'

import { useState } from 'react'
import { Form, Input, Button } from "@heroui/react";
import { createClient } from "@/utils/supabase/client"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type AuthMode = 'login' | 'signup'

interface AuthFormProps {
  mode?: AuthMode;
}

export function AuthForm({ mode = 'login' }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = createClient();

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/confirm`,
            // Estos datos son necesarios debido a que agregamos la autenticación con GitHub y estos metadatos GitHub ya nos los da.
            data: {
              name: email.split('@')[0],
              user_name: email.split('@')[0],
              avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
            }
          }
        });

        if (error) {
          setError(error.message);
        } else {
          setSuccess('¡Cuenta creada! Revisa tu email para confirmar tu cuenta.');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
        } else {
          setSuccess('¡Inicio de sesión exitoso!');
          router.push('/');
          router.refresh();
        }
      }
    } catch (err: any) {
      console.error('Error completo:', err);
      setError(err.message || 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <Form className="w-full max-w-xs mb-4 mt-4" action={handleSubmit}>
        <Input
          isRequired
          errorMessage="Por favor, ingresa un email válido"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Ingresa tu email"
          type="email"
          isDisabled={loading}
        />
        <Input 
          isRequired
          label="Password"
          labelPlacement='outside'
          name='password'
          placeholder='Ingresa tu password'
          type='password'
          isDisabled={loading}
          minLength={6}
        />
        
        {error && (
          <div className="text-small text-danger bg-danger-50 p-2 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="text-small text-success bg-success-50 p-2 rounded mb-4">
            {success}
          </div>
        )}

        <Button 
          type="submit" 
          color="primary"
          isLoading={loading}
          isDisabled={loading}
          className="w-full"
        >
          {loading ? 'Procesando...' : (mode === 'signup' ? 'Crear cuenta' : 'Iniciar sesión')}
        </Button>
      </Form>

      <div className="text-center mt-4">
        {mode === 'login' ? (
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Regístrate aquí
            </Link>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
