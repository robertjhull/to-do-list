import { FetchOptions } from "../interface/FetchOptions";

export const updateReminder = async (reminderId: string, completed: boolean): Promise<void> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: completed }),
    credentials: 'include',
  };
  return await fetch(`/reminders/${reminderId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};