'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/animate-ui/components/animate/tabs";
import MovementsHistory from "@/components/movements/MovementsHistory";
import RegisterMovement from "@/components/movements/RegisterMovement";
import { ArrowRightLeft, FolderInput, History } from "lucide-react";
import { useState } from "react";

export default function EntradasPage() {
  const [view, setView] = useState("register")

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ArrowRightLeft size={30} />
          <h1 className="text-3xl font-semibold">Entradas / Salidas</h1>
        </div>
        <div className="flex items-center gap-4">
          <Tabs value={view} onValueChange={setView}>
            <TabsList>
              <TabsTrigger value="register">
                <FolderInput />
                Registrar
              </TabsTrigger>
              <TabsTrigger value="record">
                <History />
                Historial
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      {view === 'register' ? (
        <RegisterMovement />
      ) : (
        <MovementsHistory />
      )}
    </div >

  )
}
