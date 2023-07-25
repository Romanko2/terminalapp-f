export interface LOGIN {
    email: string;
    password: string;
}

export interface REGISTER {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface FORGOTPASSWORD {
    email:string;
}

export interface EDITPROFILE {
    id:any;
    firstName:any;
}

export interface CHANGEPASSWORD {
    newPassword:any;
    confirmPassword:any;
    currentPassword:any;
}