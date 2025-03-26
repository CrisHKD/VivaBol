import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { API_URL } from "../auth/constants";
import { AuthResponseError } from "../types/types";
import ReCAPTCHA from "react-google-recaptcha";

import Select from "react-select";
import countries from "world-countries";

export default function Signup(){
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState<string>("");
    const [password, setPassword] = useState('');


    const [errorResponse, setErrorResponse] = useState('');

    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/signup`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                     name,
                     lastName,
                     email,
                     birthDate,
                     country,
                     gender, 
                     password,})
            })
            if (response.ok){
                console.log('User created');
                setErrorResponse('');

                goTo('/');
            }else{
                console.log('Something went wrong');
                const json = (await response.json()) as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Definir la estructura del país
    interface CountryOption {
        value: string;
        label: string;
    }
    
    // Formatear los países para el select
    const formattedCountries: CountryOption[] = countries.map((country) => ({
        value: country.cca2, // Código del país (ej. "US", "MX")
        label: country.name.common, // Nombre del país (ej. "United States", "México")
    }));

    const onChangeCaptcha = () => {
        console.log("Captcha value:");
    }

    if(auth.isAuthenticated){
        return <Navigate to="/dashboard" />;
    }

    return (
    <DefaultLayout>
        <form className="form" onSubmit={handleSubmit}>
            <h1>Signup</h1>
            {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
            <label>Nombre</label>
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value) }/>
            <label>Apellidos</label>
            <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value) }/>

            <label >Correo electronico</label>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
            <label >Pais</label>
            <Select
                options={formattedCountries}
                value={formattedCountries.find((c) => c.value === country) || null} // Para mostrar el valor correcto
                onChange={(selectedOption) => setCountry(selectedOption?.value || "")} // Guardar el código del país
                placeholder="Seleccione un país"
            />
            <label >Fecha de nacimiento</label>
            <input 
                type="date" 
                value={birthDate} 
                onChange={(e) => setBirthDate(e.target.value)}/>
            
            <label >Genero</label>
            <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)}
                required>
                <option value="">Selecciona una opción</option>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
                <option value="Other">Otro</option>
                <option value="Prefer not to say">Prefiero no decirlo</option>
            </select>

            <ReCAPTCHA
                sitekey="6Lc6i_wqAAAAADn9mUgqMjnyTuzaArjzFO_zL9Lb"
                onChange={onChangeCaptcha}
            />,
            <label>Password</label>
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
            <button>Create User</button>
        </form>
        
    </DefaultLayout>
    );
}