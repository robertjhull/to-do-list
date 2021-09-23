import { Table } from "react-bootstrap";
import Reminder from "../dashboard/Reminder";
import { Reminder as IReminder } from "../../interface/Reminder";

const tableStyle = {
  marginTop: "100px"
}

export default function ReminderList(reminders: IReminder[]): JSX.Element {
  return (
    <Table style={tableStyle}>
      <thead>
        <tr>
          <th colSpan={2}>All Reminders</th>
          <th colSpan={2}>Sort:</th>
        </tr>
      </thead>
      <tbody>
        {reminders && Object.values(reminders).map((reminder, idx) => {
          return <Reminder key={idx} {...reminder} />
        })}
      </tbody>
    </Table>
  )
}