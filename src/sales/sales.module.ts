import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, customerSchema } from './schema/customer.schema';
import { Invoice, invoiceSchema } from './schema/invoice.schema';
import { Products, productsSchema } from './schema/products.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: customerSchema },
      { name: Invoice.name, schema: invoiceSchema },
      { name: Products.name, schema: productsSchema },
    ]),
  ],
  controllers: [SalesController],
  providers: [
    SalesService,
    AuthService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class SalesModule {}
