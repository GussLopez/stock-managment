'use client'
import { PackageIcon } from "@phosphor-icons/react"

interface BrandLogoProps {
  variant?: 'white' | 'default'
}

export const BrandLogo = ({ variant = 'default' } : BrandLogoProps) => { 
  return (
    <div className={`flex items-center gap-1 ${variant === 'white' ? 'text-white' : ''} flex items-center gap-1`}>
      <PackageIcon size={40} weight="bold" className={`${variant === 'white' ? 'text-white' : 'text-primary'}`}/>
      <p className="text-3xl font-semibold">Stock<span className={`${variant === 'white' ? 'text-white' : 'text-neutral-500'}`}>Pro</span></p>
    </div>
  )
}