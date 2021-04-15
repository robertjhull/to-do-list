import { useRouter, withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { parseCookies } from '../../utils/cookies';
import Form from '../../components/Form'
import Note from '../../components/Note'
import Navbar from '../../components/Nav'

/* Allows you to view and edit your notes */
const NotePage = ({data}) => {
  const router = useRouter()
  let { username, id } = JSON.parse(data.user);

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

  getUserNotes();

  const updateNote = async(note_id, finished) => {
    const res = await fetch(`/api/notes/${ note_id }`, {
        method: 'PUT',
        headers: {
            Accept: contentType,
            'Content-Type': contentType,
        },
        body: JSON.stringify(!finished)
    }).then(res => {
        getUserNotes()
    }).catch(err => {
        console.log(err)
    })
  }

  const deleteNote = async(note_id) => {
    const res = await fetch('/api/notes', {
        method: 'DELETE',
        headers: {
            Accept: contentType,
            'Content-Type': contentType,
        },
        body: JSON.stringify(note_id)
    }).then(res => {
        getUserNotes()
    }).catch(err => {
        console.log(err)
    })
  }

  useEffect(() => {
    setTimeout(function() {
      let checkboxes = document.getElementsByClassName("finished-input")
      for (let checkbox of checkboxes) {
        if (checkbox.value == "true") checkbox.checked = true;
        else checkbox.checked = false;
      }
    }, 3000)
  }, [userNotes])

  return (
    <>
      <Navbar />
      <h1>{ username }'s notes</h1>
      <Form user_id={ id } refresh={ getUserNotes } />
      <table>
        <thead>
        </thead>
        <tbody>
            {userNotes.length > 0 && userNotes.map((note, key) => {
              return(
                <Note 
                  key={key}
                  id={note._id}
                  finished={note.finished}
                  priority={note.priority}
                  content={note.content}
                  attachment={note.attachment}
                  date_added={note.date_added}
                  updateNote={ updateNote }
                  deleteNote={ deleteNote }
                />)
            })}
        </tbody>
      </table>
    </>
  )
}

NotePage.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req)
  
  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" })
      res.end()
    }
  }
  return {
    data: data && data,
  }
}

export default withRouter(NotePage);