'use client'

import { User } from "@supabase/supabase-js"
import { Input } from "../ui/input"
import { useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { PackageIcon, WarningCircleIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { Checkbox } from "../ui/checkbox"
import { BrandLogo } from "../ui/BrandLogo"
import { Spinner } from "../ui/spinner"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ui/error-message"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

interface LoginDemoProps {
  user: User | null
}
interface LoginForm {
  email: string;
  password: string;
}

export default function Login({ user }: LoginDemoProps) {
  const [loading, setLoading] = useState(false);
  const supabase = getSupabaseBrowserClient();
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter();
  const initialValues: LoginForm = {
    email: "",
    password: "",
  }
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues
  })
  const handleLogin = async (formData: LoginForm) => {
    setLoading(true);
    setAuthError(null);

    const { email, password } = formData;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setAuthError("Correo o contraseña incorrectos");
      } else {
        setAuthError("Ocurrió un error inesperado. Intenta nuevamente.");
      }
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();

    setLoading(false);
  }
  return (
    <>
      <header className="flex justify-between items-center px-12 py-3 border-b border-gray-200 dark:border-neutral-800">
        <BrandLogo />
        <div>
          <Link
            href={'/auth/register'}
            className="font-medium text-sm hover:text-primary text-neutral-700 dark:text-neutral-200 transition-colors"
          >Registrate</Link>
        </div>
      </header>
      <div className="max-w-104 mx-auto p-10">
        <div className="flex flex-col items-center mb-6">
          <PackageIcon size={60} className="text-primary mb-3" />
          <h1 className="mb-1 text-3xl font-semibold">Accede a tu cuenta</h1>
          <p className="text-sm text-gray-600 dark:text-neutral-200">¿No tienes cuenta? <Link className="text-primary underline font-medium" href={'/auth/register'}>Registrate</Link></p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
          {authError && (
            <Alert className="border-red-400 bg-red-50 text-red-600">
              <WarningCircleIcon size={20} />
              <AlertTitle className="font-semibold ">Credenciales Inválidas</AlertTitle>
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="email">Email</label>
            <Input
              id="email"
              type="text"
              {...register("email", {
                required: "El email es requerido"
              })}
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="name">Password</label>
            <Input
              id="name"
              type="password"
              {...register("password", {
                required: 'La contraseña es requerida'
              })}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>
          <div className="flex gap-2 items-center mb-8">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-sm text-gray-600 dark:text-neutral-100"
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
            className="block text-sm text-primary/80 dark:text-primary hover:underline text-center font-medium"
            href={'/forgot-password'}>¿Olvidaste tu contraseña?</Link>
        </form>
      </div>
    </>
  )
}