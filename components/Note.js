import react from 'react'

export default function Note(props) {
    const contentType = 'application/json'
    const { id, priority, content, attachment, date_added, refresh } = props;
    const priorityMark = "!".repeat(priority);

    const deleteNote = async() => {
        const res = await fetch('/api/notes', {
            method: 'DELETE',
            headers: {
                Accept: contentType,
                'Content-Type': contentType,
            },
            body: JSON.stringify(id)
        }).then(res => {
            console.log(res)
            refresh()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <tr>
            <td className="td-finished">
                <input 
                    type="checkbox"
                    id="finished-input"
                    name="finished" 
                    value="true"
                ></input>
            </td>
            <td className="td-priority">{ priorityMark }</td>
            <td className="td-content">
                {attachment ?
                    <a href={attachment}>{content}
                      <svg xmlns="http://www.w3.org/2000/svg" className="svg-link" viewBox="0 0 16 16"><path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"/></svg>
                    </a> :
                    <>{content}</>
                }{' '}
            </td>
            <td className="td-date">{date_added}</td>
            <td className="td-delete">
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-delete" viewBox="0 0 16 16" onClick={ deleteNote }><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
            </td>
        </tr>
    )
}