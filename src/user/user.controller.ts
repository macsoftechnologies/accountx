import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from './dto/user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from 'src/auth/guards/roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async registerUser(@Body() req: userDto) {
    try{
      const registeruser = await this.userService.createUser(req);
      return registeruser
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @Post('/login')
  async loginuser(@Body() req: userDto) {
    try {
      const findUser = await this.userService.loginUser(req);
      return findUser;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  @UseGuards(JwtGuard)
  @Post('/update')
  async updateUser(@Body() req: userDto) {
    try {
      const modify = await this.userService.editUser(req);
      return modify;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/list')
  async userList() {
    try {
      const getUsers = await this.userService.getUsersList();
      return getUsers;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  @UseGuards(JwtGuard)
  @Post('/getbyid')
  async getUser(@Body() req: userDto) {
    try {
      const getUser = await this.userService.getUserById(req);
      return getUser;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/delete')
  async deleteUser(@Body() req: userDto) {
    try {
      const remove = await this.userService.removeUser(req);
      return remove;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}
