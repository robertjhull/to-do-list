const User = require('../models/User')
const Note = require('../models/Note')

const _get = (req) => {
    const results = Note.find({
        user_id : { $eq: req.user_id }
    }, function(err, notes) {
        if (err) {
            console.log(err)
        }
    })
    // perform operation on results if needed
    // const notes = results.map((doc) => {
    //     const note = doc.toObject()
    //     note._id = note._id.toString()
    //     return note
    // })
    
    return results;
}

const _add = (req) => {
    let note = new Note({
        user_id: req.user_id,
        content: req.content,
        attachment: req.attachment,
        priority: req.priority,
        date_added: req.date_added,
        finished: req.finished
    })
    note.save()
    .then(note => {
        console.log("Successfully added note!")
    })
    .catch(error => {
        console.log(error)
    })

    return note;
}

const _update = (req) => {
    console.log(req)
}

const _delete = (req) => {
    console.log(req)
}

module.exports = { _get, _add, _update, _delete }