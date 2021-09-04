import { FetchOptions } from "../interface/FetchOptions";

const addReminder = async (title: string, date: Date, priority: number): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, date, priority }),
    credentials: 'include',
  };
  return await fetch(`/api/reminders`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default addReminder;