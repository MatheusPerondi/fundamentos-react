import { createContext } from "react";

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

const sessionContext = createContext({} as SessionContextData);
