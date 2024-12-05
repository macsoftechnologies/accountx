import { ApiProperty } from "@nestjs/swagger";

export class userDto{
    @ApiProperty()
    userId: string
    @ApiProperty()
    userName: string
    @ApiProperty()
    emailId: string
    @ApiProperty()
    password: string
    @ApiProperty()
    mobileNumber: string
    @ApiProperty()
    companyName: string
    @ApiProperty()
    TINNumber: string
    @ApiProperty()
    GSTIN: string
    @ApiProperty()
    address: string
    @ApiProperty()
    bankAccountNumber: string
    @ApiProperty()
    role: string
}