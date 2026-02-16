'use client'

import { User } from "@supabase/supabase-js"
import { Input } from "../ui/input"
import { useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { Button } from "../ui/button"
import { BrandLogo } from "../ui/BrandLogo"
import Link from "next/link"
import { PackageIcon } from "@phosphor-icons/react"
import { Spinner } from "../ui/spinner"
import { Checkbox } from "../ui/checkbox"

interface RegisterProps {
  user: User | null
}

export default function Register({ user }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = getSupabaseBrowserClient();


  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombres: nombre
        }
      }
    })
    setLoading(false);
    console.log({ data });
  }
  return (
    <>
      <header className="flex justify-between items-center px-12 py-3 border-b border-gray-200">
        <BrandLogo />
        <div>
          <Link
            href={'/auth/login'}
            className="font-medium text-sm hover:text-primary text-neutral-700 transition-colors"
          >Acceder</Link>
        </div>
      </header>
      <div className="max-w-104 mx-auto p-10">
        <div className="flex flex-col items-center mb-6">
          <PackageIcon size={60} className="text-primary mb-3" />
          <h1 className="mb-1 text-3xl font-semibold">Crea una cuenta</h1>
          <p className="text-sm text-gray-600">¿Ya tienes cuenta? <Link className="text-primary underline font-medium" href={'/auth/register'}>Inicia sesión</Link></p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="nombre">Nombres</label>
            <Input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
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
            >
              Acepto <Link href={'/'} className="hover:underline">términos y condiciones</Link>
            </label>
          </div>
          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading && <Spinner className="size-4.5" />}
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}