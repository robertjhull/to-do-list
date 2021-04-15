import react, { useEffect } from 'react'
import LinkSVG from '../public/link.svg'
import DeleteSVG from '../public/delete.svg'

export default function Note(props) {
    const contentType = 'application/json'
    const { id, finished, priority, heading, content, attachment, date_added, updateNote, deleteNote } = props;
    const priorityMark = "!".repeat(priority);

    useEffect(() => {
        if (finished) { document.getElementById(id).className = "note-finished" }
        else { document.getElementById(id).className = "" }
    }, [finished])

    return (
        <tr className="note-row">
            {/* Checkbox that sets finished status of note */}
            <td className="td-finished">
                {finished ?
                    <input 
                      type="checkbox"
                      className="finished-input"
                      name="finished"
                      value={finished}
                      onChange={ () => updateNote(id, finished) }
                      checked
                    ></input> :
                    <input 
                      type="checkbox"
                      className="finished-input"
                      name="finished" 
                      value={finished}
                      onChange={ () => updateNote(id, finished) }
                    ></input>
                }
            </td>
            {/* Priority of note */}
            <td className="td-priority">{ priorityMark }</td>
            {/* Note content */}
            <td className="td-content" id={id}>
                {attachment ?
                    <a href={attachment}>
                      {content}{' '}
                      <LinkSVG className="svg-link" />
                    </a> :
                    <>{content}</>
                }{' '}
            </td>
            {/* Note heading */}
            <td className="td-heading">
                { heading && heading.toUpperCase() }
            </td>
            {/* Date added in format MM/DD/YYYY */}
            <td className="td-date">{date_added}</td>
            {/* Delete button */}
            <td className="td-delete">
                <DeleteSVG 
                  className="svg-delete" 
                  onClick={ () => deleteNote(id) }
                />
            </td>
        </tr>
    )
}