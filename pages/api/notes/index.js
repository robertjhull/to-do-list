import dbConnect from '../../../utils/dbConnect'
const User = require('../../../models/User')
const Note = require('../../../models/Note')

const _update = (req) => {
    console.log(req)
}

const _delete = (req) => {
    console.log(req)
}

export default async function handler(req, res) {
  
  const { method } = req

  await dbConnect()

  switch (method) {
      case 'GET':
          try {
            const notes = Note.find({
                user_id : { $eq: req.body.user_id }
            }, function(err, notes) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(notes)
                }
            })
            res.status(201).json({ success: true, data: notes })
          } catch (error) {
              res.status(400).json({ success: false })
          }
          break;
      case 'POST':
          try {
            let note = new Note({
                user_id: req.body.user_id,
                content: req.body.content,
                attachment: req.body.attachment,
                priority: req.body.priority,
                date_added: req.body.date_added,
                finished: req.body.finished
            })
            note.save()
            .then(note => {
                console.log("Successfully added note!")
            })
            .catch(error => {
                console.log(error)
            })
            res.status(201).json({ success: true, data: note })
          } catch (error) {
              res.status(400).json({ success: false })
          }
          break;
      default:
          res.status(400).json({ success: false })
          break;
  }
}
