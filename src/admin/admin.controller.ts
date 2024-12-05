import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { adminDto } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/register')
  async adminRegister(@Body() req: adminDto) {
    try{
      const registerAdmin = await this.adminService.createAdmin(req);
      return registerAdmin
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @Post('/login')
  async loginadmin(@Body() req: adminDto) {
    try {
      const findAdmin = await this.adminService.loginAdmin(req);
      return findAdmin;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}
