import { destroyCookie, setCookie } from "nookies";
import path from "path";
import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "@/services/apiClient";

const CESUL_USER = "cesul_user"
const CESUL_TOKEN = "cesul_token";
const CESUL_REFRESHTOKEN = "cesul_refreshtoken";

type User = {
    email: string,
    permissions: string[];
    roles: string[];
}

type Credentials = {
    email: string,
    password: string,
}

type SessionContextData = {
    user: User;
    updateUser: (user: User) => Promise<void>;
    singIn: ({ email, password }: Credentials) => Promise<void>
}

const SessionContext = createContext({} as SessionContextData);

interface SessionProviderProps {
    children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {

    const [user, setUser] = useState<User>({} as User);

    async function createCookie(name: string, value: string) {
        setCookie(null, name, value, {
            path: "/",
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        })
    }

    async function updateUser(user: User) {
        createHookUser(user);
    }

    async function singIn({ email, password }: Credentials) {
        try {
            const response = await api.post('/sessions', {
                email,
                password,
            })

            const { token, refreshToken, permissions, roles } = response.data;

            createCookie(CESUL_USER, JSON.stringify(email, permissions, roles));
            createCookie(CESUL_TOKEN, JSON.stringify(token));
            createCookie(CESUL_REFRESHTOKEN, JSON.stringify(refreshToken));

            setUser({ email, permissions, roles })
        } catch (error) {
            console.log(error)
        }
    }

    async function singOut() {
        destroyCookie(null, CESUL_USER, {
            path: "/"
        });
    }

    async function createHookUser(user: User) {
        setCookie(null, CESUL_USER, JSON.stringify(user), {
            path: "/",
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        });

        setUser(user);
    }

    return (
        <SessionContext.Provider value={{ user, updateUser, singIn }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);
