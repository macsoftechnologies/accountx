import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { customerDto } from './dto/customer.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from 'src/auth/guards/roles.enum';
import { productsDto } from './dto/products.dto';
import { invoiceDto } from './dto/invoice.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/createcustomer')
  async createCustomer(@Body() req: customerDto) {
    try{
      const addCustomer = await this.salesService.createBuyer(req);
      return addCustomer
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/customerlist')
  async getCustomers(@Body() req: customerDto) {
    try{
      const getCustomers = await this.salesService.getBuyerList(req);
      return getCustomers
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/getcustomerbyid')
  async getCustomerDetails(@Body() req: customerDto) {
    try{
      const modifyCustomer = await this.salesService.getBuyerDetails(req);
      return modifyCustomer
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/editcustomer')
  async editCustomer(@Body() req: customerDto) {
    try{
      const modifyCustomer = await this.salesService.editBuyer(req);
      return modifyCustomer
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/deletecustomer')
  async deleteCustomer(@Body() req: customerDto) {
    try{
      const removeCustomer = await this.salesService.removeBuyer(req);
      return removeCustomer
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  // Products APIs
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/addproduct')
  async createProduct(@Body() req: productsDto) {
    try{
      const addProduct = await this.salesService.addProduct(req);
      return addProduct
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/getproductslist')
  async getProducts(@Body() req: productsDto) {
    try{
      const getProducts = await this.salesService.getProductsList(req);
      return getProducts
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/getproductbyid')
  async getProductDetailsById(@Body() req: productsDto) {
    try{
      const getProduct = await this.salesService.getProductDetails(req);
      return getProduct
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/editproduct')
  async editProduct(@Body() req: productsDto) {
    try{
      const modifyProduct = await this.salesService.updateProduct(req);
      return modifyProduct
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/deleteproduct')
  async deleteProduct(@Body() req: productsDto) {
    try{
      const removeProduct = await this.salesService.deleteProduct(req);
      return removeProduct
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/generateinvoice')
  async generateInvoice(@Body() req: invoiceDto) {
    try{
      const createInvoice = await this.salesService.generateInvoice(req);
      return createInvoice
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/getinvoices')
  async getInvoicesList(@Body() req: invoiceDto) {
    try{
      const getInvoice = await this.salesService.getInvoices(req);
      return getInvoice
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/getinvoicesbycustomer')
  async getInvoicesListByCustomer(@Body() req: invoiceDto) {
    try{
      const getInvoices = await this.salesService.getInvoicesByCustomer(req);
      return getInvoices
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }


  @Post('/getinvoicebyid')
  async getInvoiceDetailsById(@Body() req: invoiceDto) {
    try{
      const getInvoice = await this.salesService.getInvoiceById(req);
      return getInvoice
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }
}