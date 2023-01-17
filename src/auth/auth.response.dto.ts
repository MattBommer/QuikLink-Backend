export class AuthResponseDto {
    status: AuthResponseStatus 
    data?: any
    message?: string
}

export enum AuthResponseStatus {
    SUCCESS = "success",
    FAILURE = "failed"
}