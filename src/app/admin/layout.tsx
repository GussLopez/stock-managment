import type { Metadata } from "next";
import { AuthContextProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Stock Pro - Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
}
