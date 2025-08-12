import { createContext, ReactNode, useContext, useState } from "react";

type User = {
    id: string;
    cpf: string;
    email: string;
    fullName: string;
    avatartUrl: string;
}

type SessionContextData = {
    user: User;
    updateUser: (user: User) => Promise<void>;
}

const SessionContext = createContext({} as SessionContextData);

interface SessionProviderProps {
    children: ReactNode;
}

export function SessionProvider({children} : SessionProviderProps){

    const [user, setUser] = useState<User>({} as User);

    async function updateUser(user: User) {
        setUser(user)
    }

    return(
        <SessionContext.Provider value={{ user, updateUser }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);
