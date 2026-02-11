import { FilesIcon, GearIcon, HouseIcon, SignOutIcon, TableIcon, UserIcon, WrenchIcon } from '@phosphor-icons/react'

export const DesplegableUser = [
  {
    text: "Mi perfil",
    icono: <UserIcon size={20} weight='bold' />,
    tipo: "miperfil",
  },
  {
    text: "Configuracion",
    icono: <GearIcon size={20} weight='bold' />,
    tipo: "configuracion",
  },
  {
    text: "Cerrar sesión",
    icono: <SignOutIcon size={20} weight='bold' />,
    tipo: "cerrarsesion",
  },
];



//data SIDEBAR
export const LinksArray = [
  {
    label: "Home",
    icon: <HouseIcon size={20} weight='bold' />,
    to: "/",
  },
  {
    label: "Kardex",
    icon: <TableIcon size={20} weight='bold' />,
    to: "/kardex",
  },
  {
    label: "Reportes",
    icon: <FilesIcon size={20} weight='bold' />,
    to: "/reportes",
  },
 
];
export const SecondarylinksArray = [
  {
    label: "Configuración",
    icon: <WrenchIcon size={20} weight='bold' />,
    to: "/configurar",
  },

];
//temas
export const TemasData = [
  {
    icono: "🌞",
    descripcion: "light",
   
  },
  {
    icono: "🌚",
    descripcion: "dark",
    
  },
];

//data configuracion
export const DataModulosConfiguracion =[
  {
    title:"Productos",
    subtitle:"registra tus productos",
    icono:"https://i.ibb.co/85zJ6yG/caja-del-paquete.png",
    link:"/configurar/productos",
   
  },
  {
    title:"Personal",
    subtitle:"ten el control de tu personal",
    icono:"https://i.ibb.co/5vgZ0fX/hombre.png",
    link:"/configurar/usuarios",
   
  },

  {
    title:"Tu empresa",
    subtitle:"configura tus opciones básicas",
    icono:"https://i.ibb.co/x7mHPgm/administracion-de-empresas.png",
    link:"/configurar/empresa",
    
  },
  {
    title:"Categoria de productos",
    subtitle:"asigna categorias a tus productos",
    icono:"https://i.ibb.co/VYbMRLZ/categoria.png",
    link:"/configurar/categorias",
    
  },
  {
    title:"Marca de productos",
    subtitle:"gestiona tus marcas",
    icono:"https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
    link:"/configurar/marca",
   
  },

]
//tipo usuario
export const TipouserData = [
  {
    descripcion: "empleado",
    icono: "🪖",
  },
  {
    descripcion: "administrador",
    icono: "👑",
  },
];
//tipodoc
export const TipoDocData = [
  {
    descripcion: "Dni",
    icono: "🪖",
  },
  {
    descripcion: "Libreta electoral",
    icono: "👑",
  },
  {
    descripcion: "Otros",
    icono: "👑",
  },
];