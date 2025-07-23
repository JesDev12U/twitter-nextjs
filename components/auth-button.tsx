'use client'

import { createClient } from "@/utils/supabase/client"
import { Button } from "@heroui/button";
import { GitHubIcon } from "@/components/icons";

const handleSignIn = async () => {
  const supabase = createClient()
  // Usar variable de entorno en producción, window.location.origin en desarrollo
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
  
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${baseUrl}/auth/confirm`
    }
  })
}

export function AuthButton() {
  return (
    <Button color="default" onPress={handleSignIn}>
      <GitHubIcon />
      Iniciar sesión con GitHub
    </Button>
  )
}

