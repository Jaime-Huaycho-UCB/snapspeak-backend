import { ApiProperty } from "@nestjs/swagger"
import { CreateDictionaryDto } from "src/modules/dictionary/dto/create-dictionary.dto"

export class CreateUserVocabularyDto extends CreateDictionaryDto {
    @ApiProperty({ description: 'Id del usuario', type: Number, nullable: false })
    idUser: number

    @ApiProperty({ description: 'Url de la imagen del objeto', type: String, nullable: false })
    imageUrl: string
}
