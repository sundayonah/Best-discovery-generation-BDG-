import Image from "next/image"
import img from "../images/luno1.png"

function Header() {
  return (
    <header>
      <div className="container">
        <div>
          <Image src={img} width={150} hieght={40} />
        </div>
      </div>
      <div></div>
    </header>
  )
}
export default Header
