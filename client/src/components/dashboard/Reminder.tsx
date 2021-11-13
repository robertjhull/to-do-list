import { Reminder } from "../../interface/Reminder";

const priorityStyle = {
  width: "5%",
  color: "#ff0000"
}

const titleStyle = {
  width: "85%"
}

const dateStyle = {
  width: "5%",
  color: "grey",
  fontSize: ".9rem"
}

const completedStyle = {
  width: "5%"
}

export default function Note(reminder: Reminder): JSX.Element {
  const { id, title, date, completed, priority } = reminder;
  const priorityMark = "!".repeat(priority);

  return (
    <tr>
      {/* Priority of note */}
      <td style={priorityStyle}>{ priorityMark }</td>
      {/* Note content */}
      <td style={titleStyle} id={id}>
        {completed ? (
          <span style={{textDecoration: 'line-through'}}>{title}</span>
        ) : (
          <>{title}</>
        )}
      </td>
      {/* Date added in format M/DD */}
      <td style={dateStyle}>
        {`${date}`}
      </td>
      {/* Checkbox that sets completed status of note */}
      <td style={completedStyle}>
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