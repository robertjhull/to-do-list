import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Form = (props) => {
  const router = useRouter()
  const contentType = 'application/json'
  const { user_id, refresh } = props;
  const [message, setMessage] = useState('')
  const [form, setForm, getForm] = useState({
    user_id: user_id,
    content: "",
    priority: 0,
    date_added: "",
    finished: false
  })

  const clearForm = () => {
    setForm({
      ...form,
      content: "",
      priority: 0
    })
  }

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
      else { 
        setMessage('Note added successfully')
        refresh()
        clearForm()
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
  }

  const handleDate = () => {
    const currDate = new Date()
    const month = currDate.getMonth() + 1
    const day = currDate.getDate()
    const year = currDate.getFullYear()
    const parsedDate = `${month}/${day}/${year}`
    setForm({
      ...form,
      date_added: parsedDate,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postData(form)
  }

  useEffect(() => {
    handleDate()
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
              type="text"
              maxLength="255"
              name="content"
              id="content-input"
              placeholder='Type your note here'
              value={form.content}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          <select
              name="priority"
              id="priority-input"
              onChange={handleChange}
              value={form.priority}
              required>
                <option value="0">Priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
          </select>
          <button type="submit" className="btn"></button>
        </div>
      </form>
    </>
  )
}

export default Form;