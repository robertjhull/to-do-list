import mongoose from 'mongoose'

/* NoteSchema will correspond to a collection in your MongoDB database. */
const NoteSchema = new mongoose.Schema({
  user_id: {
    /* The owner of the note */

    type: Number,
    required: [true],
  },
  content: {
    /* The content of the note */

    type: String,
    required: [true, "Note must have content"],
    maxLength: [255, "Note cannot be longer than 255 characters"],
  },
  attachment: {
    /* Attached link or file */

    type: String,
    require: [false],
    maxLength: [255, "Attachment cannot be longer than 255 characters"]
  },
  tags: {
    /* The tags of the note for easy lookup */

    type: Array,
    required: [false],
    maxLength: [30, 'Tags must be 30 characters or less'],
  },
  sub_notes: {
    /* Sub-notes listed underneath main note */

    required: [false],
    type: Array,
  },
  finished: {
    type: Boolean
  }
})

export default mongoose.models.Note || mongoose.model('Note', NoteSchema)
