'use client'

import { createClient } from "@/utils/supabase/client"
import { Button } from "@heroui/button";
import { GitHubIcon } from "@/components/icons";

const handleSignIn = async () => {
  const supabase = createClient()
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/confirm`
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

