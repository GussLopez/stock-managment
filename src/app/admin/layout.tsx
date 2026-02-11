import type { Metadata } from "next";
import { AuthContextProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Stock Pro - Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <div>
        admin
      </div>
    </AuthContextProvider>
  );
}
