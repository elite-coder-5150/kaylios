export interface FormDataBase {
    isSuccessful: boolean;
    signupFailed?: boolean;
    loginFailed?: boolean;
    errorMsg: string;
}