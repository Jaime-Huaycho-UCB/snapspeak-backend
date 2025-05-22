import { Module } from '@nestjs/common';
import { UserVocabulariesService } from './user-vocabularies.service';
import { UserVocabulariesController } from './user-vocabularies.controller';

@Module({
  controllers: [UserVocabulariesController],
  providers: [UserVocabulariesService],
})
export class UserVocabulariesModule {}
