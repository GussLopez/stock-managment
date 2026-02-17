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
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import ErrorMessage from "../ui/error-message"

interface RegisterProps {
  user: User | null
}
interface RegisterForm {
  nombre: string;
  email: string;
  password: string;
}

export default function Register({ user }: RegisterProps) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = getSupabaseBrowserClient();
  const initialValues: RegisterForm = {
    nombre: "",
    email: "",
    password: "",
  }
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues
  })

  const handleLogin = async (formData: RegisterForm) => {
    try {
      setLoading(true);
      const { email, password, nombre } = formData;
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
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oopss...",
          text: "Ocurrio un error al registrarte"
        });
      }
      console.log({ data });
    } catch (error) {
      throw new Error('Error al registrar un usuario');
    }
  }
  return (
    <>
      <header className="flex justify-between items-center px-12 py-3 border-b border-gray-200 dark:border-neutral-800">
        <BrandLogo />
        <div>
          <Link
            href={'/auth/login'}
            className="font-medium text-sm hover:text-primary text-neutral-700 dark:text-neutral-100 transition-colors"
          >Acceder</Link>
        </div>
      </header>
      <div className="max-w-104 mx-auto p-10">
        <div className="flex flex-col items-center mb-6">
          <PackageIcon size={60} className="text-primary mb-3" />
          <h1 className="mb-1 text-3xl font-semibold">Crea una cuenta</h1>
          <p className="text-sm text-gray-600 dark:text-neutral-200">¿Ya tienes cuenta? <Link className="text-primary underline font-medium" href={'/auth/login'}>Inicia sesión</Link></p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="nombre">Nombres</label>
            <Input
              id="nombre"
              type="text"
              {...register("nombre", {
                required: "El nombre es requerido",
              })}
            />
           <ErrorMessage>{errors.nombre?.message}</ErrorMessage> 
          </div>
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
          </div>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="name">Contraseña</label>
            <Input
              id="name"
              type="password"
              {...register("password", {
                required: "La contraseña es requerida"
              })}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage> 
          </div>
          <div className="flex gap-2 items-center mb-8">
            <Checkbox />
            <label
              htmlFor="remember"
              className="text-sm text-gray-600 dark:text-neutral-100"
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