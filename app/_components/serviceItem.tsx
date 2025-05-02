"use client"

import type { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { date } from "zod"
import { time } from "console"
import format from "date-fns/format"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, 'name'>
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00"
];

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const handleTimeSelect = (time: string | undefined) => {
    setSelectedTime(time)
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

              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle>Fazer reserva</SheetTitle>
                </SheetHeader>
                <div className="flex items-center justify-center py-3 border-t-2 border-purple-600 border-solid">
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
                {selectedDay && (
                  <div
                    className="p-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden border-y-2"
                    onWheel={(e) => {
                      if (e.deltaY !== 0) {
                        e.preventDefault();
                        e.currentTarget.scrollLeft += e.deltaY;
                      }
                    }}
                  >
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}
                {selectedTime && selectedDay && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="p-3 space-y-3">
                        <div className="flex justify-between items-center">
                          <h2 className="font-bold">{service.name}
                          </h2>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <h2 className="text-sm text-gray-400">Data
                          </h2>
                          <p className="text-sm text-gray-400">
                            {format(selectedDay, "d 'de' MMMM", { locale: ptBR })}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <h2 className="text-sm text-gray-400">Horário
                          </h2>
                          <p className="text-sm text-gray-200">
                            {selectedTime}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <h2 className="text-sm text-gray-400">Barbearia
                          </h2>
                          <p className="text-sm text-gray-200">
                            {barbershop.name}
                          </p>
                        </div>

                      </CardContent>
                    </Card>

                  </div>
                )}
                {selectedDay && selectedTime && (
                  <SheetFooter className="px-5">
                    <SheetClose asChild>
                      <Button type="submit">Confirmar</Button>
                    </SheetClose>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default ServiceItem
