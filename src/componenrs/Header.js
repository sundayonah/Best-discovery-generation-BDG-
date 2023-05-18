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
      <div className="flex items-center bg-navBg p-2 flex-grow">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image src={img} width={30} hieght={30} className="cursor-pointer" />
        </div>
        {/* Search */}
        <div className="hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500">
          <input type="text" />
          {/* <BeakerIcon className="h-6 w-6 text-blue-500" /> */}

          {/* <SearchIcon className="h-12 p-4" /> */}

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
      </div>
      {/* Bottom nav */}
      <div></div>
    </header>
  )
}
export default Header
