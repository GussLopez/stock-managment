import { Image, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../animate-ui/components/buttons/button";
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from "../animate-ui/components/animate/tabs";

export default function AddProduct() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Agregar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir nuevo producto</DialogTitle>
          <DialogDescription>Completa los campos con la información del producto para crearlo</DialogDescription>
        </DialogHeader>

        <Tabs>
          <TabsList className="w-full mb-4">
            <TabsTrigger value={'general'}>General</TabsTrigger>
            <TabsTrigger value={'detalles'}>Detalles</TabsTrigger>
            <TabsTrigger value={'precios'}>Precios</TabsTrigger>
            <TabsTrigger value={'inventario'}>Inventario</TabsTrigger>
          </TabsList>
          <TabsContents>
            <TabsContent value="general">
              <div>
                <div className="flex items-center justify-center w-60 h-60 border-2 border-dashed rounded-lg border-gray-300 text-gray-300 hover:text-gray-700">
                  <Image />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="detalles">
              <div>
                Detalles
              </div>
            </TabsContent>
            <TabsContent value="precios">
              <div>
                Precios
              </div>
            </TabsContent>
            <TabsContent value="inventario">
              <div>
                Inventario
              </div>
            </TabsContent>
          </TabsContents>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
