function BooksFeed({ books }) {
  console.log(books)
  return (
    <div>
      <h1>Books here''''''</h1>
      {books.map(({ id, title, description, categoriy, image }) => (
        <p>{title}</p>
      ))}
    </div>
  )
}
export default BooksFeed
