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
    _id: string,
    username: string,
    name: string,

    lastName: string,
    email: string,
    birthDate: string,
    country:string,
    gender: string,
}

export interface AccessTokenResponse {
    statusCode: number,
    body: {
        accessToken: string,
    },
    error?: string,
}