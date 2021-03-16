import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../utils/dbConnect'
import Pet from '../../models/Note'

/* Allows you to view pet card info and delete pet card*/
const PetPage = ({ pet }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')

  const handleDelete = async () => {
    const petID = router.query.id

    try {
      await fetch(`/api/pets/${petID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the pet.')
    }
  }

    /* The PUT method edits an existing entry in the mongodb database.
    NEED TO UPDATE */
    const putData = async (form) => {
      const { id } = router.query
  
      try {
        const res = await fetch(`/api/pets/${id}`, {
          method: 'PUT',
          headers: {
            Accept: contentType,
            'Content-Type': contentType,
          },
          body: JSON.stringify(form),
        })
  
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
          throw new Error(res.status)
        }
  
        const { data } = await res.json()
  
        mutate(`/api/pets/${id}`, data, false) // Update the local data without a revalidation
        router.push('/')
      } catch (error) {
        setMessage('Failed to update pet')
      }
    }
  
    /* The POST method adds a new entry in the mongodb database. 
    NEED TO UPDATE */
    const postData = async (form) => {
      try {
        const res = await fetch('/api/pets', {
          method: 'POST',
          headers: {
            Accept: contentType,
            'Content-Type': contentType,
          },
          body: JSON.stringify(form),
        })
  
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
          throw new Error(res.status)
        }
  
        router.push('/')
      } catch (error) {
        setMessage('Failed to add pet')
      }
    }

  return (
    <div key={pet._id}>
      <div className="card">
        <img src={pet.image_url} />
        <h5 className="pet-name">{pet.name}</h5>
        <div className="main-content">
          <p className="pet-name">{pet.name}</p>
          <p className="owner">Owner: {pet.owner_name}</p>

          {/* Extra Pet Info: Likes and Dislikes */}
          <div className="likes info">
            <p className="label">Likes</p>
            <ul>
              {pet.likes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
            <ul>
              {pet.dislikes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${pet._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const pet = await Pet.findById(params.id).lean()
  pet._id = pet._id.toString()

  return { props: { pet } }
}

export default PetPage

// change to notes for this page ->

// import Link from 'next/link'
// import dbConnect from '../utils/dbConnect'
// import Pet from '../models/Note'

// const Index = ({ pets }) => (
//   <>
//     {/* Create a card for each pet */}
//     {pets.map((pet) => (
//       <div key={pet._id}>
//         <div className="card">
//           <img src={pet.image_url} />
//           <h5 className="pet-name">{pet.name}</h5>
//           <div className="main-content">
//             <p className="pet-name">{pet.name}</p>
//             <p className="owner">Owner: {pet.owner_name}</p>

//             {/* Extra Pet Info: Likes and Dislikes */}
//             <div className="likes info">
//               <p className="label">Likes</p>
//               <ul>
//                 {pet.likes.map((data, index) => (
//                   <li key={index}>{data} </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="dislikes info">
//               <p className="label">Dislikes</p>
//               <ul>
//                 {pet.dislikes.map((data, index) => (
//                   <li key={index}>{data} </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="btn-container">
//               <Link href="/[id]/edit" as={`/${pet._id}/edit`}>
//                 <button className="btn edit">Edit</button>
//               </Link>
//               <Link href="/[id]" as={`/${pet._id}`}>
//                 <button className="btn view">View</button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </>
// )

// /* Retrieves pet(s) data from mongodb database */
// export async function getServerSideProps() {
//   await dbConnect()

//   /* find all the data in our database */
//   const result = await Pet.find({})
//   const pets = result.map((doc) => {
//     const pet = doc.toObject()
//     pet._id = pet._id.toString()
//     return pet
//   })

//   return { props: { pets: pets } }
// }

// export default Index

