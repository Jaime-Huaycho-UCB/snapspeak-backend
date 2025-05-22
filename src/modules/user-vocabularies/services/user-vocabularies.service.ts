import { Injectable } from '@nestjs/common';
import { CreateUserVocabularyDto } from '../dto/create-user-vocabulary.dto';
import { UpdateUserVocabularyDto } from '../dto/update-user-vocabulary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVocabulary } from '../entities/user-vocabulary.entity';
import { Repository } from 'typeorm';
import { DictionaryService } from 'src/modules/dictionary/services/dictionary.service';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()	
export class UserVocabulariesService {
	constructor (
		@InjectRepository(UserVocabulary)
		private readonly userVocabularyRepository: Repository<UserVocabulary>,
		private readonly dictionaryService: DictionaryService,
		private readonly usersService: UsersService
	){}

	async create(data: CreateUserVocabularyDto) {
		const user = await this.usersService.findOne(data.idUser);
		const dictionary = await this.dictionaryService.create({
			word: data.word,
			idLanguage: data.idLanguage,
			translated: data.translated
		})
		const vocabulary = new UserVocabulary();
		vocabulary.dictionary = dictionary!;
		vocabulary.user = user!;
		vocabulary.imageUrl = data.imageUrl;
		const vocabularySaved = await this.userVocabularyRepository.save(vocabulary);
		return vocabularySaved;
	}

	async findAll(idUser: number) {
		let vocabularies = await this.userVocabularyRepository.find({
			where: {
				user: {
					id: idUser
				}
			},
			relations: {
				dictionary: {
					language: true
				}
			}
		})
		return vocabularies.map((vocabulary) => {
			return {
				id: vocabulary.id,
				word: vocabulary.dictionary.word,
				language: vocabulary.dictionary.language,
				translated: vocabulary.dictionary.translated,
				imageUrl: vocabulary.imageUrl
			}
		})
	}

	remove(id: number) {
		return `This action removes a #${id} userVocabulary`;
	}
}
