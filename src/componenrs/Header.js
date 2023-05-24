import Image from "next/image"
import img from "../images/my-avatar.png"
import {
   MenuIcon,
   ShoppingCartIcon,
   SearchIcon,
   BeakerIcon,
} from "@heroicons/react/outline"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { selectItems } from "@/slices/basketSlice"
// import { BeakerIcon, Search } from "@heroicons/react/24/outline"

//note this !!!!!!!!!
//persist the basket
//deploy to vercel
//setp the search input when a user, the item's should popup
//create personal API fro the books

function Header() {
   const { data: session } = useSession()
   const router = useRouter()

   const items = useSelector(selectItems)

   // console.log(items)

   // console.log(session.user.name)
   // console.log(session.user)

   return (
      <header className="sticky top-0 z-50">
         <div className="flex items-center bg-navBg p-2 flex-grow py-2">
            <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
               <Image
                  onClick={() => router.push("/")}
                  src={img}
                  width={30}
                  hieght={30}
                  alt="logoimg"
                  className="cursor-pointer "
                  objectfit="contain"
               />
            </div>
            {/* Search */}
            <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
               <input
                  className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
                  type="text"
               />

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
               <div onClick={!session ? signIn : signOut} className="Link ">
                  <p className="hover:underline">
                     {session ? `Hello, ${session.user.name}` : "Sign In"}
                  </p>
                  <p className="font-extrabold md:text-sm">Account & List</p>
               </div>
               <div
                  onClick={() => session && router.push("/orders")}
                  className="Link"
               >
                  <p>Returns</p>
                  <p className="font-extrabold md:text-sm">& Orders</p>
               </div>{" "}
               <div
                  onClick={() => router.push("/checkout")}
                  className=" relative Link flex items-center"
               >
                  <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                     {items.length}
                  </span>
                  <ShoppingCartIcon className="h-8" />
                  <p className=" hidden md:inline font-extrabold md:text-sm mt-2">
                     Basket
                  </p>
               </div>
            </div>
         </div>
         {/* Bottom nav */}

         {/* <div className=" flex items-center bg-nav2Bg text-white space-x-3 p-2 pl-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 p-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <p className="Link flex items-center">All</p>
        <p className="Link">Books</p>
        <p className="Link">Recent</p>
        <p className="Link">Check- In</p>
        <p className="Link hidden lg:inline-flex">Check- In</p>
        <p className="Link hidden lg:inline-flex">Check- In</p>
        <p className="Link hidden lg:inline-flex">Check- In</p>
        <p className="Link hidden lg:inline-flex">Check- In</p>
        <p className="Link hidden lg:inline-flex">Check- In</p>
        <p className="Link hidden lg:inline-flex">Check- In</p>
      </div> */}
      </header>
   )
}
export default Header
