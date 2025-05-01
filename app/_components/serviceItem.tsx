"use client"

import type { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { date } from "zod"

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-3 p-3 md:flex-nowrap">
        {/*IMAGE*/}
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            alt={service?.name}
            src={service.imageUrl}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        {/*DIREITA*/}
        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          {/*PREÇO E BOTÃO*/}
          <div className="item-center flex justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size={"sm"}
                  className="border-purple-500 hover:border"
                >
                  Reservar
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Fazer reserva</SheetTitle>
                </SheetHeader>
                <div className="flex items-center justify-center py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    styles={{
                      caption: {
                        textTransform: "uppercase",
                      },
                      head_cell: {
                        width: "100%",
                        height: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        borderColor: "#f033d3",
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        borderColor: "#f033d3",
                        width: "32px",
                        height: "32px",
                      },
                      button: {
                        width: "100%",
                        height: "100%",
                      },
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default ServiceItem
