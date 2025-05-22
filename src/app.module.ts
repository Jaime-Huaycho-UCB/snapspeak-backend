import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';
import { UserVocabulariesModule } from './modules/user-vocabularies/user-vocabularies.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UsersModule,
    LanguagesModule,
    DictionaryModule,
    UserVocabulariesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
