import Books from "./Books"

function BooksFeed({ books }) {
  // console.log(books)
  return (
    <div>
      <h1>Books here''''''</h1>
      {books.map(({ id, title, price, description, category, image }) => (
        <Books
          key={id}
          id={id}
          title={title}
          price={price}
          description={description}
          category={category}
          image={image}
        />
      ))}
    </div>
  )
}
export default BooksFeed
