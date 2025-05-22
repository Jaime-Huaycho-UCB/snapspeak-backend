import { ApiProperty } from "@nestjs/swagger";
import { WordDto } from "src/modules/dictionary/dto/word.dto";

export class UserVocabularyDto extends WordDto {
    @ApiProperty({description: 'Id del usuario',type: Number,nullable: false})
    idUser: number

    @ApiProperty({description: 'Url de la imagen del objeto',type: String,nullable: false})
    imageUrl: string
}