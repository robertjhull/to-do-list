import dbConnect from '../../../utils/dbConnect'
import Note from '../../../models/Note'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get notes by user ID */:
      try {
        const notes = await Note.find({ user_id : { $eq: id }})
        if (!notes) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: notes })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
