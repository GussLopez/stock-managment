'use client';
import UserCard from "@/components/admin/userCard";
import CreateUser from "@/components/admin/users/CreateUserModal";
import DeleteUserModal from "@/components/admin/users/DeleteUserModal";
import EditUserModal from "@/components/admin/users/EditUserModal";
import { Spinner } from "@/components/ui/spinner";
import { getUsers } from "@/lib/services/userService"
import { Employe } from "@/types";
import { useQuery } from "@tanstack/react-query"
import { Users } from "lucide-react";
import { useState } from "react";

export interface editEmploye {
  id: string;
  name: string;
  email: string;
  role: string
}

type ModalState =
  | { type: "edit"; employe: editEmploye }
  | { type: "delete"; employeId: string }
  | null

export default function UsuariosPage() {
  const [modal, setModal] = useState<ModalState>(null)
  const { data, isLoading, error } = useQuery({
    queryKey: ["business-users"],
    queryFn: async () => await getUsers(),
    retry: 1,
    refetchOnWindowFocus: false
  })

  const openEdit = (employe: editEmploye) =>
    setModal({ type: "edit", employe })

  const openDelete = (employeId: string) => 
    setModal({ type: "delete", employeId })
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Users size={30} />
          <h1 className="text-3xl font-semibold">Gestión de usuarios</h1>
        </div>
        <div>
          <CreateUser />
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center mt-40">
          <Spinner className="size-7" />
        </div>
      ) : (

        <div className="grid grid-cols-4 gap-5 mt-10">
          {data?.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          ))}
        </div>
      )}
      {modal?.type === 'edit' && (
        <EditUserModal
          open
          employe={modal.employe}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === 'delete' && (
        <DeleteUserModal
          open
          userId={modal.employeId}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
