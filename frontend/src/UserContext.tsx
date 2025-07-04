import { createContext } from "react";

export interface USER {
  username: string;
  email: string;
  role: string;
}


// context/UserContext.tsx


interface UserContextType {
  user: USER | null;
  setUser: (user: USER | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default UserContext;

