import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarButton from "./sidebar-button"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href={"/"}>
          <Image src="/logo-01.svg" height={18} width={120} alt="FSBarber" />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="border-purple-500 hover:border"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarButton />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
