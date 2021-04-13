import { useRouter, withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Form from '../../components/Form'
import Note from '../../components/Note'

/* Allows you to view and edit your notes */
const NotePage = () => {
  const router = useRouter()
  const { username, id } = router.query;
  const contentType = 'application/json'

  let [userNotes, setUserNotes] = useState([]);

  const getUserNotes = async () => {
    const res = await fetch(`/api/notes/${ id }`, {
      method: 'GET',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      }
    }).then(res => {
      return res.json();
    })
    .then(notes => {
      setUserNotes([...notes.data])
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    console.log("fetching notes")
    let notes = getUserNotes()
  }, [])

  return (
    <>
      <h1>{ username }'s notes</h1>
      <Form user_id={ id } refresh={ getUserNotes } />
      <table>
        <thead>
        </thead>
        <tbody>
            {userNotes.length && userNotes.map((note, key) => {
              return(<div key={key}>
                <Note 
                  id={note._id}
                  priority={note.priority}
                  content={note.content}
                  attachment={note.attachment}
                  date_added={note.date_added}
                  refresh={ getUserNotes }
                />
              </div>)
            })}
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

