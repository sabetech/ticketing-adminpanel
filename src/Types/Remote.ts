export type RemoteResponse<T> = {
    data: T;
    success: boolean;
    message: string;
}

export type RemoteError<T> = {
    response: T
}
    
export type TErrorResponse = {
    data: {
        message: string
    }
}

export type AppError = {
    success: false;
    message: string;
}