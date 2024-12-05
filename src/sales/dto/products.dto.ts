import { ApiProperty } from "@nestjs/swagger";

export class productsDto{
    @ApiProperty()
    productId: string

    @ApiProperty()
    userId: string

    @ApiProperty()
    productName: string

    @ApiProperty()
    productDescription: string

    @ApiProperty()
    price: string
}