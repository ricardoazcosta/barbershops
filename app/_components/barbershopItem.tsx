import type { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface barbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: barbershopItemProps) => {
  return (
    <Card className="min-w-[170px] rounded-xl">
      <CardContent className="p-0 px-1 pt-1">
        {/**Imagem */}
        <div className="relative h-[159px] w-full">
          <Image
            alt="{babershop.name}"
            fill
            className="rounded-xl object-cover"
            src={barbershop.imageUrl}
          />
          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>
        {/**TEXTO */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold text-violet-400">
            {barbershop.name}
          </h3>
          <p className="truncate text-sm text-gray-300">{barbershop.address}</p>
          <Button
            variant="ghost"
            className="mt-3 w-full border-purple-500 hover:border"
            asChild
          >
            <Link href={`/barberShops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
