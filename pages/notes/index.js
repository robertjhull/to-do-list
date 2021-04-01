import { useRouter, withRouter } from 'next/router'
import Form from '../../components/Form'
import Note from '../../components/Note'

/* Allows you to view and edit your notes */
const NotePage = () => {
  const router = useRouter()
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

  const sampleNote = {
    content: "This is a longer example note with an added link and higher priority.",
    priority: 2,
    date_added: "3/18/21",
    attachment: "#"
  }

  return (
    <>
      <h1>{router.query.username}'s notes</h1>
      <Form />
      <table>
        <thead>
        </thead>
        <tbody>
          <Note note={sampleNote} />
        </tbody>
      </table>
    </>
  )
}

export default withRouter(NotePage);

// change to notes for this page ->

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

// export default Index

