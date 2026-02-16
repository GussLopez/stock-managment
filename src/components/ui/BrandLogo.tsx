'use client'
import { PackageIcon } from "@phosphor-icons/react"

export const BrandLogo = () => { 
  return (
    <div className="flex items-center gap-1">
      <PackageIcon size={40} weight="bold" className="text-primary"/>
      <p className="text-3xl font-semibold">Stock<span className="text-neutral-500">Pro</span></p>
    </div>
  )
}