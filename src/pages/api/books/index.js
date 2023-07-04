export default function handler(req, res) {
   try {
      // Mock data for books (replace with your actual data source or database integration)
      const books = [
         {
            id: 1,
            title: "Adventure To a Glorious Destiny",
            price: 800,
            description: "Description for Book 1",
            category: "Category 1",
            image: `${process.env.NEXTAUTH_URL}/bookimgs/adventurreToaGloriousDestiny.jpg`,

         },
         {
            id: 2,
            title: "Are we still Brethren",
            price: 500,
            description: `This book is a solution to the fallen away of true love of God and the misconception 
            about love in the brotherhood and the Christendom at large. This book clearly shows you what the true 
            love of God is and what it offers both to a believer and unbeliever.`,
            category: "Category 2",
            image: `${process.env.NEXTAUTH_URL}/bookimgs/areWeStillBrethren.jpg`,

         },
         {
            id: 3,
            title: "Be Think-Active Not a Talkative",
            price: 600,
            description: `Five percent of the people think, ten percent of the 
            people think they think; and the other eighty- five percent would 
            rather die than think.” Thomas Edison Your destiny is at risk if you 
            talk more than you think. Thinking is engaging your mind for a profitable life, 
            while talking is engaging your mouth for unprofitable life.
            The six chapters of this book are crafted to help you discover your potential
             as a problem solver. It rightfully identifies'
            right- thinking’ as the solution to the many woes betiding this generation.
            This book is a clarion call for everyone to think more and talk less.
            Remember, “ as a man thinketh in his heart, so is he” ( prov. 23:7)`,
            category: "Category 1",
            image: `${process.env.NEXTAUTH_URL}/bookimgs/beThink-Active.jpg`,
         },
         {
            id: 4,
            title: "Correct The Foundational Error of your Father",
            price: 1000,
            description: `We live in world of errors. Many are struggling with the errors committed by their 
            forefathers, in attempt to correct them, they commit more errors because they know exactly what to do
             and how to go about it. Remember, every uncorrected error graduates to becomes a generational curses.
              Some of these errors committed by our fore fathers are not even known until the spirit of God reveals 
              them and knowing what to do to correct them we will continue to struggle in them. When things are not 
              working in a family, there is what is responsible, until it is discovered and corrected things remain 
              the same. When is continuous repetition of an evil pattern in a family, there is an error to be corrected,
              it could be foundational in nature or other wise.
            This book offers the spiritual and practical wayward in discovery and correcting that error. Every 
            error you corrected brings liberation to you and your family. This is the book that answers all your
             questions as regards to the deed of your fathers and the aftermath effect.`,
            category: "Category 2",
            image: `${process.env.NEXTAUTH_URL}/bookimgs/correctTheFoundation.jpg`,
         },
         {
            id: 5,
            title: "keys To Accessing Finishing Grace",
            price: 700,
            description: `It is easy to start things, but not every task started sees the desired end.
            The starting grace is available to all, but the finishing grace is available to few.
            We are in a kingdom that operates on keys, and until you have the key, you can’t have access 
            to the contents of the room – whether they are yours or not.
            Anyone that must maximize destiny and finish  his / her cause here on earth must get hold of the keys. 
            Learn how to access the finishing grace by practically applying the keys contained in this book
             so as to not only finish, but finish well and at the expected (set) time.
            Until you access the finishing grace you will be disgrace in the process.`,
            category: "Category 1",
            image: `${process.env.NEXTAUTH_URL}/bookimgs/keyToAccessingFinishingGrace.jpg`,

         },
         {
            id: 6,
            title: "Part-time Christian versus full-time Devil",
            price: 400,
            description: `Life is a battle and you are the battle ground. There is a daily battle over your 
            life and destiny. There is no such thing as a battle free day. Whether as a believer or unbeliever.
             The devil is full time battle with God’s people and their destinies. This is the sole reason 
             God sent this book to you so to know what to do and where to stand to have daily or ever triumph over the devil.
            Life can not be fare to you until you win the warfare of life. When you are losing the battle of life,
            it is a proof that you have left your victory ground.
            This book shows you the danger of dual allegiance to God and the devil and also clearly and 
            practically tells you what to do to gain victory over the devil cheaply when you choose to stand with God. 
            Remember, choose you  this  whom ye will serve…( Joshua 24:15)`,
            category: "Category 2",
            image: `${process.env.NEXTAUTH_URL}/bookimgs/Part-TimeChristian.jpg`,

         },
         {
            id: 7,
            title: "Silince That Strange Voice",
            price: 500,
            description: `We live by voices, our actions are the direct effect of the voice we obeyed. 
            There are three voices you hear. The voice of God, the voice of Satan ( strange) and your personal voice.
            All these have negative and positive effects in our life and destiny. There are misinterpretation of 
            these voices which has led many to destruction and frustration. Many don’t know the one to obey and how 
            to differentiate them. This book clearly identifies these three voices and keys to engage to stop the one
             that leads to destruction and frustration.`,
            category: "Category 1",
            image: `${process.env.NEXTAUTH_URL}/bookimgs/silinceThatStrangeVoice.jpg`,
         },
         {
            id: 8,
            title: "SURVIVAL: The Glory Of Revival",
            price: 700,
            description: `The world is experiencing a tumultuous phase of it’s existence, 
            and the clamor for survival is at the forefront. However, survival has defied 
            all physical pointers and projections. In spite of the advancement in health, 
            technology and economic expertise, the survival of man rich or poor has become an emergent
             issue in modern times. Pandemics, wars, poverty and the likes have plagued the world 
             and in the desperate quest for survival, mankind fell into further destruction.
            The aforementioned challenges is the sole reason God sent this book to you, to show you in 
            practical terms what you must do to survive. Undoubtedly as the title suggests, revival is key. 
            Revival however requires preparation for optimal result as it either raise or erase you.
            This book tells you clearly what you must do to be raised.
            Remember, only those who are revived will survival! Take the decision to be revived now by 
            studiously digesting the contents of this book, and you will experience the reviving power 
            of God like never before.`,
            category: "Category 2",
            image: `${process.env.NEXTAUTH_URL}/bookimgs/theGloryOfRevival.jpg`,

         },
         {
            id: 9,
            title: "The Power Of Creativity",
            price: 1000,
            description: `This book offers you the practical and spiritual solution to a stagnated, 
            frustrated, struggling and the likes of life, business, career and vocation. Without creativity
             you can not escape captivity. Life is in phases, and only those who are creative changes levels 
             in what they do. You can not be doing one thing the same way and expected a different result. 
             Every chapter in this book unleased the power of transformation.`,
            category: "Category 1",
            image: `${process.env.NEXTAUTH_URL}/bookimgs/thePowerOfCreativity.jpg`,

         },
         {
            id: 10,
            title: "The Power Of LIght",
            price: 700,
            description: `Darkness is slavery. No one advances successfully in darkness. Life and your 
            destiny is a journey. And you cannot journey successfully in darkness without light. Until you know 
            better you can not go further. You cannot found a missing item in darkness without light. 
            A journey of discovery requires light. This book presents to you the power of light with undeniable result.
            What light can not do is what God cannot do.  Applying the contents of this book puts you on the 
            flight in life and destiny.`,
            category: "Category 2",
            image: `${process.env.NEXTAUTH_URL}/bookimgs/thePowerOfLIght.jpg`,
         },
         {
            id: 11,
            title: "The Three Dimension of God's Will",
            price: 1000,
            description: "Description for Book 1",
            category: "Category 1",
            image: `${process.env.NEXTAUTH_URL}/bookimgs/theThreeDimensionofGodsWill.jpg`,

         },

         // Add more books as neede
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
