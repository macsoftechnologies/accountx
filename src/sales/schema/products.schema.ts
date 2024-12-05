import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class Products extends Document{
    @Prop({default: uuid})
    productId: string
    @Prop()
    userId: string
    @Prop()
    productName: string
    @Prop()
    productDescription: string
    @Prop()
    price: string
}

export const productsSchema = SchemaFactory.createForClass(Products);