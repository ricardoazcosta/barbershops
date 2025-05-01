import { Card, CardContent } from "./ui/card"
import Image from "next/image"
const Footer = () => {
  return (
    <footer>
      <Card>
        <CardContent className="flex flex-row items-center justify-center p-px">
          <p className="text-center text-sm text-gray-300">© 2024 Copyright</p>
          <Image
            src="/Design2.svg"
            height={18}
            width={180}
            alt="logo barbershop"
          />
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
