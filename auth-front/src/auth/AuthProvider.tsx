import { useContext, createContext, useState, useEffect } from "react";
import type { AccessTokenResponse, AuthResponse, User } from "../types/types";
import { API_URL } from "../auth/constants";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => {},
    saveUser: (userData: AuthResponse) => {},
    getRefreshToken: () => {},
    getUser: () => ({} as User | undefined),
    setImage: (url:string) => {},
    signOut: () => {},
});

export function AuthProvider({children}: AuthProviderProps){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(true);
    //const [refreshToken, setRefreshToken] = useState<string>("");

    useEffect(() => {
        checkAuth();
    }, []);

    async function requestNewAccessToken(refreshToken: string){
        try {
            const response = await fetch(`${API_URL}/refresh-token`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Autorization: `Bearer ${refreshToken}`
                },
            });
            if(response.ok){
                const json = (await response.json()) as AccessTokenResponse;

                if(json.error){
                    throw new Error(json.error);
                }
                return json.body.accessToken;
            }else{
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async function getUserInfo(accessToken: string){
        try {
            const response = await fetch(`${API_URL}/user`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Autorization: `Bearer ${accessToken}`
                },
            });
            if(response.ok){
                const json = await response.json();

                if(json.error){
                    throw new Error(json.error);
                }

                return json.body.user;
            }else{
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async function checkAuth(){
        if(accessToken){
            //el usuario esta autenticado
            const userInfo = await getUserInfo(accessToken);

            if(userInfo){
                saveSesionInfo(userInfo, accessToken, getRefreshToken()!);
                setIsLoading(false);
                return;
            }
        }else{
            // el usuario no esta autenticado
            const token = getRefreshToken();
            
            if(token){
                //llamar a la api para renovar el token
                const newAccessToken = await requestNewAccessToken(token);
                if(newAccessToken){
                    const userInfo = await getUserInfo(newAccessToken);
                    if(userInfo){
                        saveSesionInfo(userInfo, newAccessToken, token);
                        setIsLoading(false);
                        return;
                    }
                }
            }
        }
        setIsLoading(false);
    }

    function signOut(){
        setIsAuthenticated(false);
        setAccessToken("");
        setUser(undefined);
        localStorage.removeItem("token");
    }

    function saveSesionInfo(userInfo: User, accessToken: string, refreshToken: string){
        setAccessToken(accessToken);
        localStorage.setItem('token', JSON.stringify(refreshToken));
        setIsAuthenticated(true);
        setUser(userInfo);
    }

    function getAccessToken(){
        return accessToken;
    }

    function getRefreshToken(): string | null {
        const tokenData = localStorage.getItem('token');
        if(tokenData){
            const token = JSON.parse(tokenData);
            return token;
        }
        return null;
    }

    function saveUser(userData: AuthResponse){
        saveSesionInfo(userData.body.user, userData.body.accessToken, userData.body.refreshToken);
    }

    function getUser(){
        return user;
    }

    function setImage(url:string){
        const data = {
            name:user!.name,
            lastName:user!.lastName,
            birthDate:user!.birthDate,
            country:user!.country,
            email:user!.email,
            foto_perfil:url,
            gender:user!.gender,
            id:user!.id,
            ident:user!.ident,
            rol:user!.rol,
            username:user!.username,
        }
        setUser(data);
        return {};
    }
    

    return (
        <AuthContext.Provider value={{
                isAuthenticated,
                getAccessToken,
                saveUser,
                getRefreshToken,
                getUser,
                setImage,
                signOut,
            }}>
            {isLoading? <div>Loading...</div>: children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

