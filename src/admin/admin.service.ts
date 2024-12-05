import { HttpStatus, Injectable } from '@nestjs/common';
import { adminDto } from './dto/admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schema/admin.schema';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private readonly authService: AuthService,
  ) {}

  async createAdmin(req: adminDto) {
    try {
      const findAdmin = await this.adminModel.findOne({ emailId: req.emailId });
      if (findAdmin) {
        return {
          statusCode: HttpStatus.CONFLICT,
          message: 'Admin already Registered',
        };
      } else {
        const bcryptPassword = await this.authService.hashPassword(
          req.password,
        );
        req.password = bcryptPassword;
      }
      const addAdmin = await this.adminModel.create(req);
      if (addAdmin) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Admin Registered Successfully',
          data: addAdmin
        };
      } else {
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          message: 'Unable to register admin',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async loginAdmin(req: adminDto) {
    try {
      const findAdmin = await this.adminModel.findOne({ emailId: req.emailId });
      if (!findAdmin) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Admin Not Found',
        };
      } else {
        const matchPassword = await this.authService.comparePassword(
          req.password,
          findAdmin.password,
        );
        if (matchPassword) {
          const jwtToken = await this.authService.createToken({ findAdmin });
          return {
            statusCode: HttpStatus.OK,
            message: 'Admin Login successfull',
            token: jwtToken,
            data: findAdmin,
          };
        } else {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Password incorrect',
          };
        }
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}
