import { ApiProperty } from "@nestjs/swagger";

class ItemDto {
    @ApiProperty()
    productName: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    quantity: number;
  
    @ApiProperty()
    price: number;
  
    @ApiProperty()
    discount: number;
  
    @ApiProperty()
    total: number;
  }

export class invoiceDto{
    @ApiProperty()
    invoiceId: string
    
    @ApiProperty()
    invoiceNumber: string
    
    @ApiProperty()
    userId: string
    
    @ApiProperty()
    customerId: string
    
    @ApiProperty()
    date: string
    
    @ApiProperty()
    dueDate: string
    
    @ApiProperty()
    deliveryDate: string
    
    @ApiProperty()
    paymentTerm: string
    
    @ApiProperty()
    Total: number
    
    @ApiProperty()
    notes: string
    
    @ApiProperty({
        type: [ItemDto]
      })
    items: ItemDto[]
}