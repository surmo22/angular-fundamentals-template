export interface ApiResponse<T> {
    successful: boolean;
    result: T;
    message?: string;
}