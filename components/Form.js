import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const Form = ({ }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    text: "",
    priority: 0,
    date_added: "",
    tags: [],
    completed: false
  })

  /* The PUT method edits an existing entry in the mongodb database. */
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

  /* The POST method adds a new entry in the mongodb database. */
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

  const handleChange = (e) => {
    const target = e.target
    const value =
      target.name === 'poddy_trained' ? target.checked : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    forNewPet ? postData(form) : putData(form)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            maxLength="255"
            name="text"
            id="text-input"
            value={form.text}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              maxLength="255"
              name="tags"
              id="tags-input"
              placeholder='Separate tags by spaces, e.g. "coding python tutorial"'
              value={form.tags}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-col">
            <input
              type="radio"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              required
            />
            <label htmlFor="priority" value="1">!</label>
            <input
              type="radio"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              required
            />
            <label htmlFor="priority" value="2">!!</label>
            <input
              type="radio"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              required
            />
            <label htmlFor="priority" value="3">!!!</label>
          </div>
          <div className="form-col">
            <button type="submit" className="btn"></button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Form
