import { Module } from '@nestjs/common';
import { UserVocabulariesService } from './services/user-vocabularies.service';
import { UserVocabulariesController } from './user-vocabularies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVocabulary } from './entities/user-vocabulary.entity';
import { UsersModule } from '../users/users.module';
import { DictionaryModule } from '../dictionary/dictionary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserVocabulary]),
    UsersModule,
    DictionaryModule
  ],
  controllers: [UserVocabulariesController],
  providers: [UserVocabulariesService],
})
export class UserVocabulariesModule {}
