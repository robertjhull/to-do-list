import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import customSelect from '../utils/customSelect';

const Form = ({ }) => {
  const router = useRouter()
  const contentType = 'application/json'
  
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    user_id: "6063f28382542401141f1a2e",
    content: "",
    attachment: "",
    priority: 0,
    date_added: "4/6/21",
    finished: false
  })

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/notes', {
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
    } catch (error) {
      setMessage('Failed to add note')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
    console.log(form)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postData(form)
  }

  useEffect(() => {
    customSelect();
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col-8">
            <input
              type="text"
              maxLength="255"
              name="content"
              id="content-input"
              placeholder='type your note here'
              value={form.content}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-col-2">
            <button type="submit" className="btn">+ New Note</button>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-8">
            <input
              type="text"
              maxLength="255"
              name="attachment"
              id="attachment-input"
              placeholder='(optional) add a link to your note'
              value={form.attachment}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-col-1 custom-select">
            <select
              name="priority"
              id="priority-input"
              onChange={handleChange}
              required>
                <option value="0">Priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
            </select>
          </div>
        </div>
      </form>
    </>
  )
}

export default Form;

  // /* The PUT method edits an existing entry in the mongodb database. */
  // const putData = async (form) => {
  //   const { id } = router.query

  //   try {
  //     const res = await fetch(`/api/pets/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         Accept: contentType,
  //         'Content-Type': contentType,
  //       },
  //       body: JSON.stringify(form),
  //     })

  //     // Throw error with status code in case Fetch API req failed
  //     if (!res.ok) {
  //       throw new Error(res.status)
  //     }

  //     const { data } = await res.json()

  //     mutate(`/api/pets/${id}`, data, false) // Update the local data without a revalidation
  //     router.push('/')
  //   } catch (error) {
  //     setMessage('Failed to update pet')
  //   }
  // }