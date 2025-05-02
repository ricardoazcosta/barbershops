import PhoneItem from "@/app/_components/phoneItem"
import ServiceItem from "@/app/_components/serviceItem"
import SidebarButton from "@/app/_components/sidebar-button"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique(
    //chamar banco de dados
    {
      where: {
        id: params.id,
      },
      include: {
        services: true,
      },
    },
  )

  barbershop?.services

  if (!barbershop) {
    return notFound()
  }
  return (
    <div>
      {/*Imagem*/}

      <div className="relative h-[250px] w-full md:h-[300px] lg:h-[200px] xl:h-[300px]">
        <Image
          alt={barbershop?.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />
        <Button
          size={"icon"}
          variant={"secondary"}
          className="absolute left-4 top-4"
          asChild
        >
          <Link href={"/"}>
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="absolute right-4 top-4 border-purple-500 hover:border"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarButton />
        </Sheet>
      </div>

      {/* Titulo*/}
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold text-violet-400">
          {barbershop?.name}
        </h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm text-gray-300">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon
            className="fill-primary-foreground text-primary"
            size={18}
          />
          <p className="text-sm text-gray-300">5,0 (499) avaliações</p>
        </div>
      </div>

      {/* Descrição*/}
      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase italic text-violet-400">
          Sobre nós
        </h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>

      {/* Serviços*/}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase italic text-violet-400">
          Serviços
        </h2>
        <div className="grid grid-rows-3 gap-3 md:grid-cols-2">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} barbershop={barbershop} />
          ))}
        </div>
      </div>

      {/* Contato*/}
      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
