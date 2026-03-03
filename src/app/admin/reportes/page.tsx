'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { getSales } from "@/lib/services/salesService";
import { Sale } from "@/types";
import { BriefcaseIcon, CalendarBlankIcon, NotePencilIcon, PackageIcon, ReceiptIcon, TicketIcon, TrashIcon, TrendUpIcon, UserCircleIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { Ban, FileClock } from "lucide-react";

export default function ReportesPage() {

  const { data, isLoading } = useQuery({
    queryKey: ["sales-reports"],
    queryFn: async () => {
      const data = await getSales();
      return data;
    },
    retry: 1,
  })

  console.log(data);
  return (
    <div>
      <div className="flex items-center gap-3">
        <FileClock size={30} className='text-primary-light' />
        <h1 className="text-3xl font-semibold">Historial de Ventas</h1>
      </div>

      <div className="mt-5">
        {isLoading && <div className="flex justify-center items-center py-10">
          <Spinner className="size-6" />
        </div>
        }

        <div className="space-y-4">
          {data?.map((sale) => {
            const formateDate = new Date(sale.created_at!)
              .toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })
            const totalCost = sale.sale_items.reduce((total, item) => {
              return total + item.products.cost
            }, 0)

            const totalRevenue = sale.sale_items.reduce((total, item) => {
              return total + (item.price - item.products.cost)
            }, 0)
            return (
              <div
                key={sale.id}
                className="w-full flex border rounded-xl border-input overflow-hidden"
              >
                <div className="md:w-1/4 p-5 shrink-0 border-r border-input bg-background">
                  <Badge
                    variant={'secondary'}
                    className="text-xs font-mono rounded-xs"
                  >
                    {sale.sale_number}
                  </Badge>
                  <div className="flex items-center text-sm gap-4 font-medium mt-4">
                    <CalendarBlankIcon size={23} className="text-muted-foreground" />
                    <p>{formateDate}</p>
                  </div>
                  <div className="flex items-center text-sm gap-4 font-medium mt-2 text-green-600 dark:text-green-400">
                    <UserCircleIcon size={23} />
                    <div className="flex flex-col">
                      <p>Cliente Anónimo</p>
                      <span className="text-[10px] uppercase font-medium tracking-wider text-muted-foreground">Cleinte</span>
                    </div>
                  </div>
                  <Separator className="w-full h-px my-3 bg-muted" />
                  <div className="flex items-center gap-4">
                    <BriefcaseIcon size={23} className="text-blue-400" weight="duotone" />
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">{sale.seller_name}</p>
                      <span className="text-[10px] uppercase font-medium tracking-wider text-muted-foreground">Vendedor</span>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex items-center gap-3 p-2.5 border-b border-input text-muted-foreground">
                    <PackageIcon size={20} />
                    <p
                      className="text-sm font-semibold uppercase tracking-wide"
                    >Productos ({sale.sale_items.length})</p>
                  </div>
                  <div className="h-full bg-facent p-2">
                    {sale.sale_items.map((item, i) => (
                      <div
                        key={item.id}
                        className="flex justify-between gap-4 p-2 rounded-md border border-transparent hover:border-input transition-all duration-300"
                      >
                        <div className="flex gap-4">
                          <div>
                            <span className="flex items-center justify-center w-10 h-10 rounded-sm bg-background border border-input">{i + 1}</span>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm font-medium">{item.products.name}</p>
                            <span className="text-xs tracking-wider font-mono">{item.products.sku}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p
                            className="text-sm font-bold text-accent-foreground"
                          >{(item.price * item.quantity).toLocaleString('es-MX', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })} MXN
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {item.quantity} x {item.price.toLocaleString('es-MX', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })} MXN
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-1/4 shrink-0 p-5 border-l border-input">
                  <div className="flex gap-2 justify-between items-baseline">
                    <span
                      className="font-bold  text-sm uppercase tracking-widest text-muted-foreground"
                    >Total</span>
                    <span className="text-2xl font-bold">
                      {sale.total.toLocaleString('es-MX', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                      })}
                    </span>
                  </div>
                  <Separator className="w-full h-px my-2" />
                  <div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Costo: </span>
                      <span className="font-mono">{totalCost.toLocaleString('ex-MX', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                      })} MXN</span>

                    </div>
                    <div className="flex justify-between mt-1 text-sm font-medium text-green-600 dark:text-green-400">
                      <div className="flex items-center gap-2">
                        <TrendUpIcon size={20} weight="bold" />
                        <p>Ganancia</p>
                      </div>
                      <span className="font-mono">{totalRevenue.toLocaleString('ex-MX', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                      })} MXN</span>

                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Button variant={"outline"}>
                      <ReceiptIcon size={20} />
                      Recibo
                    </Button>
                    <Button variant={"outline"}>
                      <NotePencilIcon size={20} />
                      Editar
                    </Button>
                    <Button
                      variant={"ghost"}
                      className="col-span-2 bg-amber-400 hover:bg-amber-500/80 dark:text-black dark:hover:bg-amber-400/90"
                    >
                      <Ban size={20} />
                      Anular venta
                    </Button>

                    <Button
                      variant={'ghost'}
                      className="bg-red-500/80 hover:bg-red-500 hover:text-white text-white dark:hover:bg-red-500"
                    >
                      <TrashIcon size={20} />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
