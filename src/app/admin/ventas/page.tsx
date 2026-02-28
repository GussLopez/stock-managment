'use client'

import { ScanBarcode, ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
interface Product {
  id: string
  name: string
  price: number
}

interface SaleItem {
  product_id: string
  quantity: number
}

export default function NuevaVenta() {
  const countries = [
    { code: "", value: "", continent: "", label: "Select country" },
    {
      code: "ar",
      value: "argentina",
      label: "Argentina",
      continent: "South America",
    },
    { code: "au", value: "australia", label: "Australia", continent: "Oceania" },
    { code: "br", value: "brazil", label: "Brazil", continent: "South America" },
    { code: "ca", value: "canada", label: "Canada", continent: "North America" },
    { code: "cn", value: "china", label: "China", continent: "Asia" },
    {
      code: "co",
      value: "colombia",
      label: "Colombia",
      continent: "South America",
    },
    { code: "eg", value: "egypt", label: "Egypt", continent: "Africa" },
    { code: "fr", value: "france", label: "France", continent: "Europe" },
    { code: "de", value: "germany", label: "Germany", continent: "Europe" },
    { code: "it", value: "italy", label: "Italy", continent: "Europe" },
    { code: "jp", value: "japan", label: "Japan", continent: "Asia" },
    { code: "ke", value: "kenya", label: "Kenya", continent: "Africa" },
    { code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
    {
      code: "nz",
      value: "new-zealand",
      label: "New Zealand",
      continent: "Oceania",
    },
    { code: "ng", value: "nigeria", label: "Nigeria", continent: "Africa" },
    {
      code: "za",
      value: "south-africa",
      label: "South Africa",
      continent: "Africa",
    },
    { code: "kr", value: "south-korea", label: "South Korea", continent: "Asia" },
    {
      code: "gb",
      value: "united-kingdom",
      label: "United Kingdom",
      continent: "Europe",
    },
    {
      code: "us",
      value: "united-states",
      label: "United States",
      continent: "North America",
    },
  ]

  return (
    <div>
      <div className="flex items-center gap-3">
        <ShoppingCart size={30} className='text-green-600' />
        <h1 className="text-3xl font-semibold">Ventas</h1>
      </div>

      <div className='grid grid-cols-3 gap-10 mt-10'>

        <div className='col-span-2 p-4 rounded-md border'>
          <div className='flex items-center gap-3'>
            <ScanBarcode />
            <h2 className='font-semibold text-lg'>Agregar Items</h2>
          </div>
          
        </div>


      </div>
    </div>
  )
}


