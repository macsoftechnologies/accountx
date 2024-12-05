import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://macsof:macsof@nextlevelcarwash.yjs3i.mongodb.net/accountx?retryWrites=true&w=majority'
    ),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: () => ({
        secretOrKey: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '10s',
        },
      }),
    }),
    AdminModule,
    UserModule,
    SalesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtService,
  ],
})
export class AppModule {}
