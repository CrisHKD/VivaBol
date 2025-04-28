import { AuthResponseError, AuthResponse } from "../types/types";
import { Navigate, useNavigate } from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import DefaultHeader from "../layout/HeaderDefault";
import { useState } from "react";
import { API_URL } from "../auth/constants";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorResponse, setErrorResponse] = useState('');

    const auth = useAuth();
    const goTo = useNavigate();

        async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
            e.preventDefault();
    
            try {
                const response = await fetch(`${API_URL}/login`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password,})
                })
                if (response.ok){
                    console.log('Login successful');
                    setErrorResponse('');
                    const json = (await response.json()) as AuthResponse;

                    if(json.body.accessToken && json.body.refreshToken){
                        auth.saveUser(json); 
                        goTo('/dashboard');
                    }

                }else{
                    console.log('Something went wrong');
                    const json = (await response.json()) as AuthResponseError;
                    setErrorResponse(json.body.error) ;
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }

    if(auth.isAuthenticated){
        return <Navigate to="/dashboard" />
    }

    return (
    <DefaultHeader>
        <form className="form" onSubmit={handleSubmit}>
            <h1>login</h1>
            {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
            <label>Correo electronico</label>
            <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

            <label >Contraseña</label>
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <button>login</button>
        </form>
    </DefaultHeader>
    );
}