import { PartialType } from '@nestjs/swagger';
import { CreateUserVocabularyDto } from './create-user-vocabulary.dto';

export class UpdateUserVocabularyDto extends PartialType(CreateUserVocabularyDto) {}
