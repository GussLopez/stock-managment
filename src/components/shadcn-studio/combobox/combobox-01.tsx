'use client'

import { useEffect, useState } from 'react';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { searchProducts } from '@/lib/services/productService'
import { Product } from '@/types'

const ComboboxSearchProduct = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const { data: products = null, isLoading } = useQuery<Product[]>({
    queryKey: ['products-search', debouncedSearch],
    queryFn: () => searchProducts(debouncedSearch),
    enabled: debouncedSearch.trim().length > 0,
    staleTime: 1000 * 60 * 50
  })
  const selectedProduct = products?.find(p => p.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full max-w-xs justify-between'
          aria-label='Framework combobox'
        >
          {selectedProduct
            ? (`${selectedProduct.name} (${selectedProduct.sku}) - ${selectedProduct.model}`)
            : 'Buscar por nombre o SKU...'}
          <ChevronsUpDownIcon className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Buscar por nombre o SKU...'
            className='h-9'
            value={inputValue}
            onValueChange={setInputValue}
          />

          <CommandList>
            {isLoading && (
              <CommandEmpty>Buscando...</CommandEmpty>
            )}
            {!isLoading && products === null && (
              <CommandEmpty >Escribe al menos 1 caracter para buscar...</CommandEmpty>
            )}
            {!isLoading && products?.length === 0 && (
              <CommandEmpty>Producto no encontrado.</CommandEmpty>
            )}
            <CommandGroup>
              {products?.map(product => (
                <CommandItem
                  key={product.id}
                  value={product.id}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  {product.name} ({product.sku}) - {product.model && product.model}
                  <CheckIcon
                    className={cn('ml-auto',
                      value === product.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboboxSearchProduct
