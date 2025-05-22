import { Module } from '@nestjs/common';
import { DictionaryService } from './services/dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { LanguagesModule } from '../languages/languages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dictionary]),
    LanguagesModule
  ],
  controllers: [DictionaryController],
  providers: [DictionaryService],
  exports: [DictionaryService]
})
export class DictionaryModule {}
