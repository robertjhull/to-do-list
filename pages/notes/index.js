import { useState } from 'react'
import { useRouter, withRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../utils/dbConnect'
import Form from '../../components/Form'
import Note from '../../components/Note'

/* Allows you to view and edit your notes */
const NotePage = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')

  // const handleDelete = async () => {
  //   const notesID = router.query.id

  //   try {
  //     await fetch(`/api/notes/${notesID}`, {
  //       method: 'Delete',
  //     })
  //     router.push('/')
  //   } catch (error) {
  //     setMessage('Failed to delete the pet.')
  //   }
  // }

  //   /* The PUT method edits an existing entry in the mongodb database.
  //   NEED TO UPDATE */
  //   const putData = async (form) => {
  //     const { id } = router.query
  
  //     try {
  //       const res = await fetch(`/api/notes/${id}`, {
  //         method: 'PUT',
  //         headers: {
  //           Accept: contentType,
  //           'Content-Type': contentType,
  //         },
  //         body: JSON.stringify(form),
  //       })
  
  //       // Throw error with status code in case Fetch API req failed
  //       if (!res.ok) {
  //         throw new Error(res.status)
  //       }
  
  //       const { data } = await res.json()
  
  //       mutate(`/api/pets/${id}`, data, false) // Update the local data without a revalidation
  //       router.push('/')
  //     } catch (error) {
  //       setMessage('Failed to update pet')
  //     }
  //   }
  
  //   /* The POST method adds a new entry in the mongodb database. 
  //   NEED TO UPDATE */
  //   const postData = async (form) => {
  //     try {
  //       const res = await fetch('/api/pets', {
  //         method: 'POST',
  //         headers: {
  //           Accept: contentType,
  //           'Content-Type': contentType,
  //         },
  //         body: JSON.stringify(form),
  //       })
  
  //       // Throw error with status code in case Fetch API req failed
  //       if (!res.ok) {
  //         throw new Error(res.status)
  //       }
  
  //       router.push('/')
  //     } catch (error) {
  //       setMessage('Failed to add pet')
  //     }
  //   }

  const sampleNote = {
    text: "This is an example note.",
    priority: 1,
    date_added: "3/18/21",
  }

  const sampleNote2 = {
    text: "This is a longer example note with an added link and higher priority.",
    priority: 3,
    date_added: "3/18/21",
    link: "#"
  }

  const sampleNote3 = {
    text: "This is a much longer example note with medium priority. This is a much longer example note with medium priority. This is a much longer example note with medium priority.",
    priority: 2,
    date_added: "3/19/21",
  }

  return (
    <>
      <h1>{router.query.username}'s notes</h1>
      <Form />
      <table>
        <thead>
        </thead>
        <tbody>
          <Note content={sampleNote} />
          <Note content={sampleNote2} />
          <Note content={sampleNote3} />
          <Note content={sampleNote} />
          <Note content={sampleNote2} />
          <Note content={sampleNote3} />
          <Note content={sampleNote} />
          <Note content={sampleNote2} />
          <Note content={sampleNote3} />
          <Note content={sampleNote} />
          <Note content={sampleNote2} />
          <Note content={sampleNote3} />
        </tbody>
      </table>
    </>
  )
}

// export async function getServerSideProps({ params }) {
//   await dbConnect()

//   const notes = await Note.findById(params.id).lean()
//   pet._id = pet._id.toString()

//   return { props: { pet } }
// }

export default withRouter(NotePage);

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

