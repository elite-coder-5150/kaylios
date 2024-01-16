import { FormDataBase } from "./simple-form-data";
export interface NewsletterFormData extends FormDataBase {
    name: string;
    email: string;
    subscribeDate: Date;
    subscriptionFailed: boolean;
}