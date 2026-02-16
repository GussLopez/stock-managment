'use client'

import { User } from "@supabase/supabase-js"
import { Input } from "../ui/input"
import { useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { PackageIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { Checkbox } from "../ui/checkbox"
import { BrandLogo } from "../ui/BrandLogo"
import { Spinner } from "../ui/spinner"

interface LoginDemoProps {
  user: User | null
}

export default function Login({ user }: LoginDemoProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      setStatus(error.message);
    } else {
      router.push('/admin');
    }

    setLoading(false);
    console.log({ data });
  }
  return (
    <>
      <header className="flex justify-between items-center px-12 py-3 border-b border-gray-200">
        <BrandLogo />
        <div>
          <Link
            href={'/auth/register'}
            className="font-medium text-sm hover:text-primary text-neutral-700 transition-colors"
          >Registrate</Link>
        </div>
      </header>
      <div className="max-w-104 mx-auto p-10">
        <div className="flex flex-col items-center mb-6">
          <PackageIcon size={60} className="text-primary mb-3" />
          <h1 className="mb-1 text-3xl font-semibold">Accede a tu cuenta</h1>
          <p className="text-sm text-gray-600">¿No tienes cuenta? <Link className="text-primary underline font-medium" href={'/auth/register'}>Registrate</Link></p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="email">Email</label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="name">Password</label>
            <Input
              id="name"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center mb-8">
            <Checkbox />
            <label
              htmlFor="remember"
              className="text-sm text-gray-600"
            >Mantener sesión iniciada por 30 días</label>
          </div>
          <div>
            <Button
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading && <Spinner className="size-4.5" />}
              Acceder
            </Button>
          </div>

          <Link
            className="block text-sm text-primary/80 underline text-center font-medium"
            href={'/forgot-password'}>¿Olvidaste tu contraseña?</Link>
        </form>
      </div>
    </>
  )
}