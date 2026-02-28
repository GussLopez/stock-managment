'use client';
import { DollarSign, ScanBarcode, ShoppingCart } from 'lucide-react'
import ComboboxSearchProduct from '@/components/shadcn-studio/combobox/combobox-01'
import { Input } from '@/components/ui/input';

export default function VentasPage() {

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
          <div className='grid grid-cols-8 mt-4 text-xs font-medium text-muted-foreground'>
            <div className='col-span-4'>
              <p>Buscar producto</p>
              <ComboboxSearchProduct />
            </div>
            <div className='col-span-2'>
              <p>Precio de venta</p>
              <div className='relative'>
                <Input
                  className='pl-9'
                  type='number'
                />
                <DollarSign className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              </div>
            </div>

            <div className='col-span-2'>
              <p>Cant.</p>
              <Input

              />
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}


