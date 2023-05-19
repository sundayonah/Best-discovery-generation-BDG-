import Header from "@/componenrs/Header"
import Image from "next/image"

function Checkout() {
  return (
    <div className="bg-gray-100 my-12">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* LEFT */}
        <div>
          <Image />
        </div>
      </main>
    </div>
  )
}
export default Checkout
