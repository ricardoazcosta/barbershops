import Image from "next/image"

import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershopItem"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { quickSearchOption } from "./_constants/search"
import BookingItem from "./_components/bookingItem"
import Search from "./_components/search"
import Link from "next/link"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá Usuario!</h2>
        <p>segunda-feira, 19 de agosto</p>
        <div className="mt-6">
          <Search />
        </div>

        {/**BUSCA RAPIDA */}
        <div className="mt-6 gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {/**
           * ITEMS DE SERVIÇOS
           */}
          <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
            {quickSearchOption.map((option) => (
              <Button
                className="gap-2 border-purple-500 text-violet-400 hover:border"
                variant={"ghost"}
                key={option.title}
                asChild
              >
                <Link href={`/barberShops?service=${option.title}`}>
                  <Image
                    alt={option.title}
                    src={option.imageUrl}
                    width={16}
                    height={16}
                  />
                  {option.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* IMAGENS*/}
        <div className="relative mt-6 h-[150px] w-full md:h-[300px] lg:h-[200px] xl:h-[300px]">
          <Image
            alt="Agendamentos"
            src="/banner1.svg"
            fill
            className="rounded-xl object-fill"
          />
        </div>
        {/* Agendamentos*/}
        <BookingItem />
        <h2 className="font-bol mb-3 mt-6 text-xs uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        <h2 className="font-bol mb-3 mt-6 text-xs uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Home
