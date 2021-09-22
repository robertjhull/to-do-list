import react, { useEffect } from 'react';
import { Reminder } from "../../interface/Reminder";
// import LinkSVG from '../public/link.svg'
// import DeleteSVG from '../public/delete.svg'

export default function Note(reminder: Reminder): JSX.Element {
    const contentType = 'application/json'
    const { id, title, date, completed, priority } = reminder;
    const priorityMark = "!".repeat(priority);

    // useEffect(() => {
    //     if (completed) { document.getElementById(id).className = "note-completed" }
    //     else { document.getElementById(id).className = "" }
    // }, [id, completed])

    return (
        <tr className="note-row">
            {/* Checkbox that sets completed status of note */}
            <td className="td-completed">
                {completed ?
                    <input 
                      type="checkbox"
                      className="completed-input"
                      name="completed"
                      checked
                    ></input> :
                    <input 
                      type="checkbox"
                      className="completed-input"
                      name="completed" 
                    ></input>
                }
            </td>
            {/* Priority of note */}
            <td className="td-priority">{ priorityMark }</td>
            {/* Note content */}
            <td className="td-title" id={id}>
                {title}
            </td>
            {/* Date added in format MM/DD/YYYY */}
            <td className="td-date">{date.getDate()}</td>
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