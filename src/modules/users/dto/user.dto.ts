import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({description: 'Id del usuario',type: Number,nullable: false})
    id: number

    @ApiProperty({description: 'Nombre de usuario',type: String,nullable: false})
    username: string
}