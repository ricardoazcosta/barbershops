"use client"
import { Button } from "./ui/button"
import { CalendarDaysIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOption } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"

const SidebarButton = () => {
  const { data } = useSession()
  const handleLoginWthGoogleClick = () => signIn("google ")
  const handleLogoutWthGoogleClick = () => signOut()

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-around border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>
            <div className="mx-2">
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá faça seu login</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button size={"icon"}>
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Faça seu login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta
                  </DialogDescription>
                </DialogHeader>
                <Button
                  className="gap-2 border-purple-500 hover:border"
                  variant={"ghost"}
                  onClick={handleLoginWthGoogleClick}
                >
                  <Image
                    src={"/google-icon.svg"}
                    width={18}
                    height={18}
                    alt="icon google"
                  />
                  Google
                </Button>
                <Button
                  className="gap-2 border-purple-500 hover:border"
                  variant={"ghost"}
                >
                  <Image
                    src={"/mac-os.svg"}
                    width={18}
                    height={18}
                    alt="icon google"
                  />
                  Apple
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 border-b border-solid border-purple-500 py-5">
        <SheetClose asChild>
          <Button
            className="justify-start gap-2 border-purple-500 hover:border"
            variant={"ghost"}
            asChild
          >
            <Link href={"/"}>
              <HomeIcon size={18} />
              Home
            </Link>
          </Button>
        </SheetClose>

        <Button
          className="justify-start gap-2 border-purple-500 hover:border"
          variant={"ghost"}
        >
          <CalendarDaysIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid border-purple-500 py-5">
        {quickSearchOption.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button
              className="justify-start gap-2 border-purple-500 text-violet-400 hover:border"
              variant={"ghost"}
              asChild
            >
              <Link href={`/barberShops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  height={18}
                  width={18}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      <div className="flex flex-col gap-2 py-5">
        <Button
          className="justify-center gap-2 border-purple-500 hover:border"
          variant={"ghost"}
          onClick={handleLogoutWthGoogleClick}
        >
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarButton
