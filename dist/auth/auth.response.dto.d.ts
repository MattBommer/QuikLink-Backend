export declare class AuthResponseDto {
    status: AuthResponseStatus;
    data?: any;
    message?: string;
}
export declare enum AuthResponseStatus {
    SUCCESS = "Success",
    FAILURE = "Failed"
}
