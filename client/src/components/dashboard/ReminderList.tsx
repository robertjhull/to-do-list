import { Table } from "react-bootstrap";
import Reminder from "../dashboard/Reminder";
import { Reminder as IReminder } from "../../interface/Reminder";

export default function ReminderList(reminders: IReminder[]): JSX.Element {
  return (
    <Table>
      <tbody>
        {reminders && Object.values(reminders).map((reminder, idx) => {
          return <Reminder key={idx} {...reminder} />
        })}
      </tbody>
    </Table>
  )
}