import dbConnect from '../../../../utils/dbConnect'
import Note from '../../../../models/Note'

export default async function handler(req, res) {
  const {
    query: { 
        "id": id,
        "sortmethod" : sortMethod
    },
    method,
  } = req

  await dbConnect()

  let notes;

  try {
    switch (sortMethod) {
        case 'Date':
            notes = await Note.find({ user_id : { $eq: id }}).sort({
                finished: false,
                date_added: -1 
            })
            break;
        case 'Priority':
            notes = await Note.find({ user_id : { $eq: id }}).sort({
                finished: false,
                priority: -1 
            })
            break;
        case 'Heading':
            notes = await Note.find({ user_id : { $eq: id }}).sort({
                finished: false,
                heading: -1 
            })
            break;
        default:
            notes = await Note.find({ user_id : { $eq: id }}).sort({
                finished: false,
                date_added: +1 
            })
            break;
    }
    if (!notes) {
        return res.status(400).json({ success: false })
    }
    res.status(200).json({ success: true, data: notes })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}
