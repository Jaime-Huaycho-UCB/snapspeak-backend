import { ApiProperty } from "@nestjs/swagger";

export class CreateLanguageDto {
    @ApiProperty({description: 'Codigo de idioma',type: Number,nullable: false})
    code: number

    @ApiProperty({description: 'Nombre de idioma',type: String,nullable: false})
    name: string
}
