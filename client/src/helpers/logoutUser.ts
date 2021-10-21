import { FetchOptions } from "../interface/FetchOptions";

const logoutUser = async (): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/auth/logout`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Something went wrong.' },
    }));
};

export default logoutUser;