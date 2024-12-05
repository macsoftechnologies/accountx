import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class Customer extends Document{
    @Prop({default: uuid})
    customerId: string
    
    @Prop()
    userId: string
    
    @Prop()
    customerName: string
    
    @Prop()
    entityName: string

    @Prop()
    industry: string
    
    @Prop()
    mobileNumber: string
    
    @Prop()
    billTo: string
    
    @Prop()
    shipTo: string
    
    @Prop()
    email: string
    
    @Prop()
    TIN: string
}

export const customerSchema = SchemaFactory.createForClass(Customer);