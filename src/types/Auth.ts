export interface AuthUser{
    user_id: string;
    username:string
}

export interface LoginResponse{
    token:string
    user: AuthUser
}


export interface JwtPayload {
  user_id: string;
  username: string;
  exp: number;
  iat: number;
}