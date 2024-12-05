import { ApiProperty } from "@nestjs/swagger";

export class customerDto{
    @ApiProperty()
    customerId: string
    
    @ApiProperty()
    userId: string
    
    @ApiProperty()
    customerName: string
    
    @ApiProperty()
    entityName: string

    @ApiProperty()
    industry: string
    
    @ApiProperty()
    mobileNumber: string
    
    @ApiProperty()
    billTo: string
    
    @ApiProperty()
    shipTo: string
    
    @ApiProperty()
    email: string
    
    @ApiProperty()
    TIN: string
}