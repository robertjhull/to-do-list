import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap';
// import { useRouter } from 'next/router'

interface Props {
  userId: string;
}

interface Radio {
  name: string;
  value: number;
}

export default function ReminderForm({ userId }: Props): JSX.Element {
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
    const priority = value === form.priority ? 0 : value;
    setForm({
      ...form,
      priority: priority
    })
  }

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
    <Form onSubmit={handleSubmit} style={{marginTop: '50px'}}>
      <Row>
        <Col lg={10}>
          <Form.Control
              type="text"
              maxLength={255}
              name="content"
              id="content-input"
              placeholder='Type your reminder here'
              value={form.content}
              onChange={handleChange}
              autoComplete="off"
              required
            />
        </Col>
        <Col lg={1}>
          <ButtonGroup>
            {radios.map((radio: Radio, idx: number): JSX.Element => (
              <Button
                key={idx}
                id={`radio-${idx}`}
                variant="danger"
                name="radio"
                onClick={(e) => setPriority(radio.value)}
                style={form.priority === radio.value ? {backgroundColor: '#d00000'} : {}}
              >
                {radio.name}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
        <Col lg={1}>
          <Button variant="primary" type="submit">Add</Button>
        </Col>
      </Row>
    </Form>
  )
}