export interface AuthResponse {
    body: {
        user: User,
        accessToken: string,
        refreshToken: string
    };
}

export interface AuthResponseError{
    body: {
        error: string,
    }
}

export interface User {
    id: number,
    ident:number,
    username: string,
    name: string,
    rol: number,

    lastName: string,
    email: string,
    birthDate: string,
    country:string,
    gender: string,

    foto_perfil:string
    
}

export interface AccessTokenResponse {
    statusCode: number,
    body: {
        accessToken: string,
    },
    error?: string,
}