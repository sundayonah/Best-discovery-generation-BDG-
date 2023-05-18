import Image from "next/image"
import img from "../images/my-avatar.png"
import {
  MenuIcon,
  ShoppingCartIcon,
  SearchIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline"
// import { BeakerIcon, Search } from "@heroicons/react/24/outline"

function Header() {
  return (
    <header>
      <div className="flex items-center bg-navBg p-2 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image src={img} width={30} hieght={30} className="cursor-pointer" />
        </div>
        {/* Search */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          {/* <SearchIcon className="h-12" /> */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 p-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {/* RIGHT */}

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-normal">
          <div className="Link">
            <p>hello, Onah</p>
            <p>Account & List</p>
          </div>
          <div className="Link">
            <p>Returns</p>
            <p>& Orders</p>
          </div>
          <div className="Link">
            <ShoppingCartIcon className="h-5" />
            <p>Basket </p>
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div></div>
    </header>
  )
}
export default Header
