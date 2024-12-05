import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schema/customer.schema';
import { Model } from 'mongoose';
import { Invoice } from './schema/invoice.schema';
import { Products } from './schema/products.schema';
import { customerDto } from './dto/customer.dto';
import { productsDto } from './dto/products.dto';
import { invoiceDto } from './dto/invoice.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
    @InjectModel(Products.name) private readonly productsModel: Model<Products>,
  ) {}

  async createBuyer(req: customerDto) {
    try {
      const findCustomer = await this.customerModel.findOne({
        $and: [
          { userId: req.userId },
          { $or: [{ mobileNumber: req.mobileNumber }, { email: req.email }] },
        ],
      });
      if (findCustomer) {
        return {
          statusCode: HttpStatus.CONFLICT,
          message: 'Customer already existed for this User.',
        };
      } else {
        const createCustomer = await this.customerModel.create(req);
        if (createCustomer) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Customer added to the user',
            data: createCustomer,
          };
        } else {
          return {
            statusCode: HttpStatus.EXPECTATION_FAILED,
            message: 'Customer not added to user.',
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

  async getBuyerList(req: customerDto) {
    try {
      const findCustomers = await this.customerModel.find({
        userId: req.userId,
      });
      if (findCustomers.length > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: 'List of customers of this user',
          data: findCustomers,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Customers not found of this user.',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async getBuyerDetails(req: customerDto) {
    try {
      const findCustomer = await this.customerModel.findOne({
        customerId: req.customerId,
      });
      if (findCustomer) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Details of the user',
          data: findCustomer,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Unable to find customer',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async editBuyer(req: customerDto) {
    try {
      const editCustomer = await this.customerModel.updateOne(
        { customerId: req.customerId },
        {
          $set: {
            customerName: req.customerName,
            entityName: req.entityName,
            mobileNumber: req.mobileNumber,
            billTo: req.billTo,
            shipTo: req.shipTo,
            email: req.email,
            TIN: req.TIN,
          },
        },
      );
      if (editCustomer) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Customer Details updated Successfully',
          data: editCustomer,
        };
      } else {
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          message: 'Unable to edit customer details',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async removeBuyer(req: customerDto) {
    try {
      const removeCustomer = await this.customerModel.deleteOne({
        customerId: req.customerId,
      });
      if (removeCustomer) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Customer Deleted Successfully',
          data: removeCustomer,
        };
      } else {
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          message: 'Unable to delete customer',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  //Product APIs

  async addProduct(req: productsDto) {
    try {
      const addproduct = await this.productsModel.create(req);
      if (addproduct) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Product Added Successfully',
          data: addproduct,
        };
      } else {
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          message: 'Failed to add Product.',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async getProductsList(req: productsDto) {
    try {
      const getprodlist = await this.productsModel.find({ userId: req.userId });
      if (getprodlist.length > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: 'List of user products',
          data: getprodlist,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No products found of this user.',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async getProductDetails(req: productsDto) {
    try {
      const getProdDetails = await this.productsModel.findOne({
        productId: req.productId,
      });
      if (getProdDetails) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Product Details',
          data: getProdDetails,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Product not found.',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async updateProduct(req: productsDto) {
    try {
      const modify = await this.productsModel.updateOne(
        { productId: req.productId },
        {
          $set: {
            productName: req.productName,
            productDescription: req.productDescription,
            price: req.price,
          },
        },
      );
      if (modify) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Product Modified Successfully',
          data: modify,
        };
      } else {
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          message: 'Product modification Failed',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async deleteProduct(req: productsDto) {
    try {
      const deleteProduct = await this.productsModel.deleteOne({
        productId: req.productId,
      });
      if (deleteProduct) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Product Deleted Successfully',
          data: deleteProduct,
        };
      } else {
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          message: 'Unable to delete product',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  //Invoice APIs

  async generateInvoice(req: invoiceDto) {
    try {
      let invoiceTotal = 0;

      req.items = req.items.map((item) => {
        const price = item.price;
        const quantity = item.quantity;
        let discount;
        if(!item.discount || item.discount === 0) {
           discount = 0;
        } else {
          discount = item.discount / 100;
        }

        const itemTotal = parseFloat(
          (price * quantity * (1 - discount)).toFixed(2),
        );

        item.total = itemTotal;

        invoiceTotal += itemTotal;

        return item;
      });

      const findCustomer = await this.customerModel.findOne({
        customerId: req.customerId,
      });

      req.invoiceNumber =
        findCustomer?.entityName.toUpperCase().trim().slice(0, 3) +
        `INV-${Math.floor(100 + Math.random() * 9000)}`;
      req.Total = parseFloat(invoiceTotal.toFixed(2));
      req.date = new Date().toISOString().split('T')[0];
      const generateInvoice = await this.invoiceModel.create(req);
      if (generateInvoice) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Invoice created Successfully',
          data: generateInvoice,
        };
      } else {
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          message: 'Invoice generation failed',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async getInvoices(req: invoiceDto) {
    try {
      const getInvoices = await this.invoiceModel.aggregate([
        { $match: { userId: req.userId } },
        {
          $lookup: {
            from: 'customers',
            localField: 'customerId',
            foreignField: 'customerId',
            as: 'customerId',
          },
        },
      ]);
      if (getInvoices.length > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Invoices list of this user.',
          data: getInvoices,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Invoices not found for this user.',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async getInvoicesByCustomer(req: invoiceDto) {
    try {
      const getInvoicesByCustomerId = await this.invoiceModel.find({
        $and: [{ userId: req.userId }, { customerId: req.customerId }],
      });
      if (getInvoicesByCustomerId.length > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Invoices list of this customer.',
          data: getInvoicesByCustomerId,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Invoices not found of this customer.',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async getInvoiceById(req: invoiceDto) {
    try {
      const findInvoice = await this.invoiceModel.findOne({
        invoiceId: req.invoiceId,
      });
      if (!findInvoice) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Invoice not found',
        };
      }
      const getInvoiceById = await this.invoiceModel.aggregate([
        {
          $match: { invoiceId: req.invoiceId },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: 'userId',
            as: 'userId',
          },
        },
        {
          $lookup: {
            from: 'customers',
            localField: 'customerId',
            foreignField: 'customerId',
            as: 'customerId',
          },
        },
        {
          $addFields: {
            userId: {
              $map: {
                input: '$userId',
                as: 'user',
                in: {
                  userId: '$$user.userId',
                  userName: '$$user.name',
                  emailId: '$$user.email',
                  mobileNumber: '$$user.mobileNumber',
                  TINNumber: '$$user.TINNumber',
                  GSTIN: '$$user.GSTIN',
                  address: '$$user.address',
                  bankAccountNumber: '$$user.bankAccountNumber',
                  role: '$$user.role',
                  createdAt: '$$user.createdAt',
                  updatedAt: '$$user.updatedAt',
                  __v: '$$user.__v',
                },
              },
            },
          },
        },
      ]);
      if (getInvoiceById) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Invoice Details',
          data: getInvoiceById,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Unable to find the invoice',
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
