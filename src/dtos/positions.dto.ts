import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { IPosition } from "src/services/optimizedPicking/optimizedPicking.interface"
export class PossitionsDTO {
    @ApiProperty()
    @IsNotEmpty()
    positionId: string

    @ApiProperty()
    @IsNotEmpty()
    x: number

    @ApiProperty()
    @IsNotEmpty()
    y: number

    @ApiProperty()
    @IsNotEmpty()
    z: number

    @ApiProperty()
    @IsNotEmpty()
    productId: string

    @ApiProperty()
    @IsNotEmpty()
    quantity: number
}
export class ProductDTO {
    @ApiProperty()
    @IsNotEmpty()
    productId: string[]

    @ApiProperty()
    @IsNotEmpty()
    startingPosition: IPosition
}