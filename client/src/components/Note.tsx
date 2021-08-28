import react, { useEffect } from 'react'
// import LinkSVG from '../public/link.svg'
// import DeleteSVG from '../public/delete.svg'

interface Props {
  id: string,
  finished: boolean,
  priority: number,
  content: string,
  dateAdded: Date,
  updateNote: () => void,
  deleteNote: () => void,
}

export default function Note(props: Props): JSX.Element {
    const contentType = 'application/json'
    const { id, finished, priority, content, dateAdded, updateNote, deleteNote } = props;
    const priorityMark = "!".repeat(priority);

    // useEffect(() => {
    //     if (finished) { document.getElementById(id).className = "note-finished" }
    //     else { document.getElementById(id).className = "" }
    // }, [id, finished])

    return (
        <tr className="note-row">
            {/* Checkbox that sets finished status of note */}
            <td className="td-finished">
                {finished ?
                    <input 
                      type="checkbox"
                      className="finished-input"
                      name="finished"
                      onChange={ () => updateNote() }
                      checked
                    ></input> :
                    <input 
                      type="checkbox"
                      className="finished-input"
                      name="finished" 
                      onChange={ () => updateNote() }
                    ></input>
                }
            </td>
            {/* Priority of note */}
            <td className="td-priority">{ priorityMark }</td>
            {/* Note content */}
            <td className="td-content" id={id}>
                {content}
            </td>
            {/* Date added in format MM/DD/YYYY */}
            <td className="td-date">{dateAdded}</td>
            {/* Delete button */}
            <td className="td-delete">
                {/* <DeleteSVG 
                  className="svg-delete" 
                  onClick={ () => deleteNote(id) }
                /> */}
            </td>
        </tr>
    )
}