"use client"

import { Smartphone } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneCLick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado com sucesso!")
  }

  return (
    <div className="flex justify-between" key={phone}>
      {/* Esqeurda*/}
      <div className="item-center flex gap-2">
        <Smartphone />
        <p className="text-sm">{phone}</p>
      </div>
      {/* Direitra*/}

      <Button
        variant={"ghost"}
        className="border-purple-500 hover:border"
        size={"sm"}
        onClick={() => handleCopyPhoneCLick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
