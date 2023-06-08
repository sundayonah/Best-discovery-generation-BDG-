export default function handler(req, res) {
   try {
      // Mock data for books (replace with your actual data source or database integration)
      const books = [
         {
            id: 1,
            title: "Adventure To a Glorious Destiny",
            price: 9.99,
            description: "Description for Book 1",
            category: "Category 1",
            image: "/../public/bookimgs/adventurreToaGloriousDestiny.jpg",
         },
         {
            id: 2,
            title: "Are we still Brethren",
            price: 14.99,
            description: "Description for Book 2",
            category: "Category 2",
            image: "/../public/bookimgs/areWeStillBrethren.jpg",
         },
         {
            id: 3,
            title: "Be Think-Active Not a Talkative",
            price: 9.99,
            description: "Description for Book 1",
            category: "Category 1",
            image: "/../public/bookimgs/beThink-Active.jpg",
         },
         {
            id: 4,
            title: "Correct The Foundational Error of your Father",
            price: 14.99,
            description: "Description for Book 2",
            category: "Category 2",
            image: "/../public/bookimgs/correctTheFoundation.jpg",
         },
         {
            id: 5,
            title: "key To Accessing Finishing Grace",
            price: 9.99,
            description: "Description for Book 1",
            category: "Category 1",
            image: "/../public/bookimgs/keyToAccessingFinishingGrace.jpg",
         },
         {
            id: 6,
            title: "Part-time Christian versus full-time Devil",
            price: 14.99,
            description: "Description for Book 2",
            category: "Category 2",
            image: "/../public/bookimgs/Part-TimeChristian.jpg",
         },
         {
            id: 7,
            title: "Silince That Strange Voice",
            price: 9.99,
            description: "Description for Book 1",
            category: "Category 1",
            image: "/../public/bookimgs/silinceThatStrangeVoice.jpg",
         },
         {
            id: 8,
            title: "SURVIVAL: The Glory Of Revival",
            price: 14.99,
            description: "Description for Book 2",
            category: "Category 2",
            image: "/../public/bookimgs/theGloryOfRevival.jpg",
         },
         {
            id: 9,
            title: "The Power Of Creativity",
            price: 9.99,
            description: "Description for Book 1",
            category: "Category 1",
            image: "/../public/bookimgs/thePowerOfCreativity.jpg",
         },
         {
            id: 10,
            title: "The Power Of LIght",
            price: 14.99,
            description: "Description for Book 2",
            category: "Category 2",
            image: "/../public/bookimgs/thePowerOfLIght.jpg",
         },
         {
            id: 11,
            title: "The Three Dimension of God's Will",
            price: 9.99,
            description: "Description for Book 1",
            category: "Category 1",
            image: "/../public/bookimgs/theThreeDimensionofGodsWill.jpg",
         },

         // Add more books as needed
      ]

      if (req.method === "GET") {
         res.status(200).json(books)
      } else {
         res.status(405).json({ error: "Method not allowed" })
      }
   } catch (error) {
      console.error("API error:", error)
      res.status(500).json({ error: "Internal server error" })
   }
}
