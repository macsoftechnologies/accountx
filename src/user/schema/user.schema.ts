import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/auth/guards/roles.enum";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class User extends Document{
    @Prop({default: uuid})
    userId: string
    @Prop()
    userName: string
    @Prop()
    emailId: string
    @Prop()
    password: string
    @Prop()
    mobileNumber: string
    @Prop()
    companyName: string
    @Prop()
    TINNumber: string
    @Prop()
    GSTIN: string
    @Prop()
    address: string
    @Prop()
    bankAccountNumber: string
    @Prop({default: Role.USER})
    role: string
}

export const userSchema = SchemaFactory.createForClass(User);