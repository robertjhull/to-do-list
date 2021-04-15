import dbConnect from '../../../utils/dbConnect'
const Note = require('../../../models/Note')

export default async function handler(req, res) {
  
  const { method } = req

  await dbConnect()

  switch (method) {
      case 'POST': // Add a new note to the db
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
      case 'DELETE': /* Delete a note by its ID */
          try {
            const deletedNote = await Note.deleteOne({ _id: req.body })
            if (!deletedNote) {
                return res.status(400).json({ success: false })
            }
            console.log("Successfully deleted note!")
            res.status(200).json({ success: true, data: {} })
          } catch (error) {
            res.status(400).json({ success: false })
          }
          break
      default:
          res.status(400).json({ success: false })
          break;
  }
}
