import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { Button, ButtonGroup, ToggleButton, Col, Form, Row } from 'react-bootstrap'
// import { useRouter } from 'next/router'

interface Props {
  userId: string;
}

interface Radio {
  name: string;
  value: number;
}

export default function ReminderForm({ userId }: Props): JSX.Element {
  const contentType = 'application/json'
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    user_id: userId,
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

  const setPriority = (value: number) => {
    setForm({
      ...form,
      priority: value
    })
  }

  /* The POST method adds a new entry in the mongodb database. */
  // const postData = async (form) => {
  //   try {
  //     const res = await fetch('/api/notes', {
  //       method: 'POST',
  //       headers: {
  //         Accept: contentType,
  //         'Content-Type': contentType,
  //       },
  //       body: JSON.stringify(form),
  //     })

  //     // Throw error with status code in case Fetch API req failed
  //     if (!res.ok) {
  //       throw new Error(`${res.status}`)
  //     }
  //     else { 
  //       setMessage('Note added successfully')
  //       clearForm()
  //     }
  //   } catch (error) {
  //     setMessage('Failed to add note')
  //   }
  // }

  const handleChange = (e: ChangeEvent) => {
    console.log(e);
    // setForm({})
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // postData();
  }

  useEffect(() => {
    handleDate()
  }, [])

  const radios = [
    { name: '!', value: 1 },
    { name: '!!', value: 2 },
    { name: '!!!', value: 3 },
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
          <Col lg={8}>
            <Form.Control
                type="text"
                maxLength={255}
                name="content"
                id="content-input"
                placeholder='Type your note here'
                value={form.content}
                onChange={handleChange}
                autoComplete="off"
                required
              />
          </Col>
          <Col lg={2}>
            <ButtonGroup>
              {radios.map((radio: Radio, idx: number): JSX.Element => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="danger"
                  name="radio"
                  value={radio.value}
                  checked={form.priority === radio.value}
                  onChange={(e) => setPriority(Number(e.currentTarget.value))}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
          <Col lg={2}>
            <Button variant="primary" type="submit">Add +</Button>
          </Col>
      </Row>
    </Form>
  )
}