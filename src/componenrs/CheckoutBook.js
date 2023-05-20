import { addToBasket, removeFromBasket } from "@/slices/basketSlice"
import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import Currency from "react-currency-formatter"
import { useDispatch } from "react-redux"

function CheckoutBook({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) {
  const dispatch = useDispatch()

  //add items to basket
  const addItemToBasket = () => {
    const book = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    }
    dispatch(addToBasket(book))
  }

  //remove item from basket
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }))
  }
  return (
    <div className="grid grid-cols-5">
      <img src={image} width={200} hieght={200} objectFit="contain" />

      {/* middle section */}

      <div className="col-span-2 mx-3">
        <p>{title}</p>
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
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-items-end">
        <button onClick={addItemToBasket} className="button">
          Add to Basket
        </button>
        <button onClick={removeItemFromBasket} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  )
}
export default CheckoutBook
