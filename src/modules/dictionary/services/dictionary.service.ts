import { Injectable } from '@nestjs/common';
import { CreateDictionaryDto } from '../dto/create-dictionary.dto';
import { UpdateDictionaryDto } from '../dto/update-dictionary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from '../entities/dictionary.entity';
import { Repository } from 'typeorm';
import { LanguagesService } from 'src/modules/languages/services/languages.service';

@Injectable()
export class DictionaryService {
	constructor(
		@InjectRepository(Dictionary)
		private readonly dictionaryRepository: Repository<Dictionary>,
		private readonly languagesService: LanguagesService
	){}

	async create(data: CreateDictionaryDto) {
		const language = await this.languagesService.findOne(data.idLanguage);
		const word = new Dictionary();
		word.word = data.word;
		word.language = language;
		word.translated = data.translated;
		const wordSaved = await this.dictionaryRepository.save(word);
		return wordSaved;
	}

	async findAll() {
		const dictionary = await this.dictionaryRepository.find({
			relations: {
				language: true
			}
		})
		return dictionary;
	}

	findOne(id: number) {
		return `This action returns a #${id} dictionary`;
	}

	update(id: number, updateDictionaryDto: UpdateDictionaryDto) {
		return `This action updates a #${id} dictionary`;
	}

	remove(id: number) {
		return `This action removes a #${id} dictionary`;
	}
}
