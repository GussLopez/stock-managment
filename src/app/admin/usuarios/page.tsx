'use client'

import UserCard from "@/components/admin/userCard";
import CreateUser from "@/components/admin/users/CreateUserModal";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { getUsers } from "@/lib/services/userService"
import { UserPlusIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query"
import { Users } from "lucide-react";

export default function UsuariosPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["business-users"],
    queryFn: async () => await getUsers(),
    retry: 1,
    refetchOnWindowFocus: false
  })

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
      <div className="grid grid-cols-4 gap-5 mt-10">
        {data?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}
