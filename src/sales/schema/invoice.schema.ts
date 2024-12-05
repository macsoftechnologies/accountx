import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ default: uuid })
  invoiceId: string;

  @Prop()
  invoiceNumber: string;

  @Prop()
  userId: string;

  @Prop()
  customerId: string;

  @Prop()
  date: string;

  @Prop()
  dueDate: string;

  @Prop()
  deliveryDate: string;

  @Prop()
  paymentTerm: string;

  @Prop({
    type: Number,
    set: (val: number) => parseFloat(val.toFixed(2)),
  })
  Total: number;

  @Prop()
  notes: string;

  @Prop({
    type: [
      {
        quantity: { type: Number, required: true },
        description: { type: String, required: true },
        itemName: { type: String, required: true },
        price: {
          type: Number,
          required: true,
          set: (val: number) => parseFloat(val.toFixed(2)),
        },
        discount: { type: Number, required: false, default: 0 },
        total: {
          type: Number,
          required: true,
          set: (val: number) => parseFloat(val.toFixed(2)),
        },
      },
    ],
    default: [],
  })
  items: {
    quantity: number;
    description: string;
    itemName: string;
    price: number;
    discount: number;
    total: number;
  }[];
}

export const invoiceSchema = SchemaFactory.createForClass(Invoice);
