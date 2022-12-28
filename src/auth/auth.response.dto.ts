export class AuthResponseDto {
    status: AuthResponseStatus 
    data?: any
    message?: string
}

export enum AuthResponseStatus {
    SUCCESS = "Success",
    FAILURE = "Failed"
}