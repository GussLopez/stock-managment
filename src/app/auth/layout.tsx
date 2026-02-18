import { BrandLogo } from "@/components/ui/BrandLogo";


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full lg:grid lg:grid-cols-12 min-h-screen">
      <div className="hidden lg:block w-full col-span-4 p-2">
        <div className="w-full h-full  rounded-lg bg-primary/85">
          <div className="px-4 py-2 mb-16">
            <BrandLogo variant="white" />
          </div>
          <div className="flex justify-center">
            <img
              src="/svg/carrito.svg"
              alt="Imagen de carrito"
              className="max-w-[80%]"
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
