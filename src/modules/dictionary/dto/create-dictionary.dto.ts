import { ApiProperty } from "@nestjs/swagger";

export class CreateDictionaryDto {
    @ApiProperty({description: 'Palabra',type: String,nullable: false})
    word: string

    @ApiProperty({description: 'Id del idioma',type: Number,nullable: false})
    idLanguage: number

    @ApiProperty({description: 'Palabra traducida',type: String,nullable: false})
    translated: string
}
