import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({description: 'Nombre del usuario',type: String,nullable: false})
    username: string

    @ApiProperty({description: 'Contrasena del usuario',type: String,nullable: false})
    password: string
}