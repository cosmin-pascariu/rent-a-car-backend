import { Controller, Get, Post, Body, Render, Res, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Body() user: User, @Res() res: Response) {
    await this.usersService.createUser(user);
    res.redirect('/users/view');
  }

  @Post('update')
  async updateUser(@Body() user: User, @Res() res: Response) {
    await this.usersService.updateUser(user);
    res.redirect('/users/view');
  }

  @Get('view')
  @Render('index') /// toare render imi returneaza un html, restul sunt json
  async getUsersView() {
    const users = await this.usersService.getAllUsers();
    return { users: users,message: 'Home page' };
  }

  @Get('create')
  @Render('create-user')
  createUsersView() {
    return { message: 'Create user' };
  }

  @Get('update/:id')
  @Render('update-user')
  async updateUsersView(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    return { user: user, message: 'Edit user' };
  }

  @Get('delete/:id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    await this.usersService.deleteUser(id);
    res.redirect('/users/view');
  }
}