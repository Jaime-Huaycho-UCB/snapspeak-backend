import { ApiProperty } from "@nestjs/swagger"
import { LanguageDto } from "src/modules/languages/dto/language.dto"

export class WordDto {
    @ApiProperty({ description: 'Palabra', type: String, nullable: false })
    word: string

    @ApiProperty({ description: 'Idioma de traduccion', type: LanguageDto, nullable: false })
    language: LanguageDto

    @ApiProperty({ description: 'Palabra traducida', type: String, nullable: false })
    traslated: string
}