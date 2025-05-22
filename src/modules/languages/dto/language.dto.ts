import { ApiProperty } from "@nestjs/swagger";

export class LanguageDto {
    @ApiProperty({description: 'Id del idioma',type: Number,nullable: false})
    id: number

    @ApiProperty({description: 'Codigo del idioma',type: Number,nullable: false})
    code: number

    @ApiProperty({description: 'Nombre del idioma',type: String,nullable: false})
    name: string
}