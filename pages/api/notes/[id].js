import dbConnect from '../../../utils/dbConnect'
import Note from '../../../models/Note'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        console.log("trying to fetch all notes from user", id)
        const notes = await Note.find({ user_id : { $eq: id }})
        if (!notes) {
          return res.status(400).json({ success: false })
        }
        console.log("found notes")
        res.status(200).json({ success: true, data: notes })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    // case 'PUT' /* Edit a model by its ID */:
    //   try {
    //     const pet = await Pet.findByIdAndUpdate(id, req.body, {
    //       new: true,
    //       runValidators: true,
    //     })
    //     if (!pet) {
    //       return res.status(400).json({ success: false })
    //     }
    //     res.status(200).json({ success: true, data: pet })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break

    // case 'DELETE' /* Delete a model by its ID */:
    //   try {
    //     const deletedPet = await Pet.deleteOne({ _id: id })
    //     if (!deletedPet) {
    //       return res.status(400).json({ success: false })
    //     }
    //     res.status(200).json({ success: true, data: {} })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break

    default:
      res.status(400).json({ success: false })
      break
  }
}
