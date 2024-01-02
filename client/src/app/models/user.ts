import { UserRoles } from "./user-roles";
export interface User {
    user_id: string;
    user_name: string;
    email: string;
    pass_hash: string;
    role: UserRoles;
    bio: string;
    profile_picture_url: string;
    joined_date: Date;
}
