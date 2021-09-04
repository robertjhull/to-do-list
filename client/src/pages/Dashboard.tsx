import ReminderForm from "../components/forms/ReminderForm";
import Navbar from "../components/dashboard/Navbar";

export default function Dashboard(): JSX.Element {
  return (
    <>
      <Navbar />
      <h1>{''}'s reminders</h1>
      <ReminderForm userId={'userId'}/>
    </>
  )
}