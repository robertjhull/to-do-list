import dbConnect from '../../../utils/dbConnect'
import NoteController from '../../../controllers/NoteController';

export default async function handler(req, res) {
  
  const { method } = req

  await dbConnect()

  switch (method) {
      case 'GET':
          try {
              let notes = NoteController._get(req.body)
              res.status(201).json({ success: true, data: notes })
          } catch (error) {
              res.status(400).json({ success: false })
          }
          break;
      case 'POST':
          try {
              let note = NoteController._add(req.body)
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
