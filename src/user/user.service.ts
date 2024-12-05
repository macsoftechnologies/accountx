import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { userDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async createUser(req: userDto) {
    try {
      const findUser = await this.userModel.findOne({
        $or: [{ emailId: req.emailId }, { mobileNumber: req.mobileNumber }],
      });
      if (findUser) {
        return {
          statusCode: HttpStatus.CONFLICT,
          message: 'User already registered',
        };
      } else {
        const bcryptPassword = await this.authService.hashPassword(
          req.password,
        );
        req.password = bcryptPassword;
      }
      const regUser = await this.userModel.create(req);
      if (regUser) {
        return {
          statusCode: HttpStatus.OK,
          message: 'User Registered Successfully',
          data: regUser,
        };
      } else {
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          message: 'User Registration Failed',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async loginUser(req: userDto) {
    try {
      const findUser = await this.userModel.findOne({
        $or: [{ emailId: req.emailId }, { mobileNumber: req.mobileNumber }],
      });
      if (!findUser) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User Not Found',
        };
      } else {
        const matchPassword = await this.authService.comparePassword(
          req.password,
          findUser.password,
        );
        if (matchPassword) {
          const jwtToken = await this.authService.createToken({ findUser });
          return {
            statusCode: HttpStatus.OK,
            message: 'Admin Login successfull',
            token: jwtToken,
            data: findUser,
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

  async editUser(req: userDto) {
    try {
      if (req.password) {
        const bcryptPassword = await this.authService.hashPassword(
          req.password,
        );
        req.password = bcryptPassword;
      }
      const editUser = await this.userModel.updateOne(
        { userId: req.userId },
        {
          $set: {
            userName: req.userName,
            emailId: req.emailId,
            mobileNumber: req.mobileNumber,
            password: req.password,
            TINNumber: req.TINNumber,
            GSTIN: req.GSTIN,
            address: req.address,
            bankAccountNumber: req.bankAccountNumber,
          },
        },
      );
      if (editUser) {
        return {
          statusCode: HttpStatus.OK,
          message: 'User Details Updated Successfully',
        };
      } else {
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          message: 'Unable to update User',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async getUsersList() {
    try {
      const getList = await this.userModel.find();
      if (getList.length > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: 'List of Users',
          data: getList,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No Users found',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async getUserById(req: userDto) {
    try {
      const findUser = await this.userModel.findOne({ userId: req.userId });
      if (findUser) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Details of the user.',
          data: findUser,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User details not found',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async removeUser(req: userDto) {
    try {
      const removeUser = await this.userModel.deleteOne({ userId: req.userId });
      if (removeUser) {
        return {
          statusCode: HttpStatus.OK,
          message: 'User Deleted Successfully',
        };
      } else {
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          message: 'Unable to delete User',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}
