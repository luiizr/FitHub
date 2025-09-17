export interface GetUserProfileDto {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserDto {
  email?: string;
  username?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}