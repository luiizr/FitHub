import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { 
  UserServiceNestJS, 
  UpdateUserDto, 
  ChangePasswordDto,
  UpdateUserUseCase,
  ChangePasswordUseCase,
  GetUserProfileDto
} from '@fithub/application';

// TODO: Implementar JwtAuthGuard para proteger as rotas
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserServiceNestJS,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase
  ) {}

  @Get(':id')
  async getUserProfile(@Param('id') id: string): Promise<GetUserProfileDto | null> {
    const user = await this.userService.getUserProfile(id);
    return user ? user.toJSON() : null;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto
  ): Promise<GetUserProfileDto> {
    const updatedUser = await this.updateUserUseCase.execute(id, updateDto);
    return updatedUser.toJSON();
  }

  @Put(':id/password')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto
  ): Promise<{ message: string }> {
    await this.changePasswordUseCase.execute(id, changePasswordDto);
    return { message: 'Password changed successfully' };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}