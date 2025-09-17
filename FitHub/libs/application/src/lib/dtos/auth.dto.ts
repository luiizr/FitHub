export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponseDto {
  user: {
    id: string;
    email: string;
    username: string;
  };
  accessToken: string;
}