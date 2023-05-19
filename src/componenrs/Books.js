import { addToBasket } from "@/slices/basketSlice"
import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import { useEffect, useState } from "react"
import Currency from "react-currency-formatter"
import { useDispatch } from "react-redux"

const MAX_RATING = 5
const MIN_RATING = 1

function Books({ id, title, price, description, category, image }) {
  const dispatch = useDispatch()

  const [rating, setRating] = useState(0)

  const [hasPrime, setHasPrime] = useState(true)

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    )
    setHasPrime(Math.random() < 0.5)
  }, [])

  const addItemToBasket = () => {
    const book = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    }
    //sending the bok as an action to redux store
    dispatch(addToBasket(book))
  }

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 rounded">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image
        src={image}
        height={150}
        width={150}
        className="m-auto object-contain"
      />
      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 overflow-hidden text-overflow-ellipsis">
        <span
          className="inline-block max-h-12 overflow-hidden"
          style={{ maxHeight: "3rem" }}
        >
          {description}
        </span>
      </p>

      <div className="mb-5">
        <Currency quantity={price} currency="NGN" />
      </div>
      {/* {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
          className="w-12"
            src="https://links.papareact.com/fwd"
            height={200}
            width={200}
            alt="prime"
          />
          <p className="text-xs text-gray-500>FREE Next-day Delivery</p>
        </div>
      )} */}

      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  )
}

export default Books
