import { HttpException, Injectable } from '@nestjs/common';
import { CreateDictionaryDto } from '../dto/create-dictionary.dto';
import { UpdateDictionaryDto } from '../dto/update-dictionary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from '../entities/dictionary.entity';
import { Like, Repository } from 'typeorm';
import { LanguagesService } from 'src/modules/languages/services/languages.service';

@Injectable()
export class DictionaryService {
	constructor(
		@InjectRepository(Dictionary)
		private readonly dictionaryRepository: Repository<Dictionary>,
		private readonly languagesService: LanguagesService
	) { }

	async create(data: CreateDictionaryDto) {
		const language = await this.languagesService.findOne(data.idLanguage);
		let word;
		try {
			word = await this.findOne(data.word,data.idLanguage,data.translated);
		} catch (error) {
			word = new Dictionary();
			word.word = data.word.toLowerCase().trim();
			word.language = language;
			word.translated = data.translated.toLowerCase().trim();
		}
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

	async findOne(word: string,idLanguage: number,translated: string) {
		const dictionary = await this.dictionaryRepository.findOne({
			where: {
				word: word,
				language: {
					id: idLanguage
				},
				translated: translated
			}
		})
		if (!dictionary) {
			throw new HttpException('No se encontro la palabra en el disccionario', 404);
		}
		return dictionary;
	}
	async findOneByWord (word: string,idLanguage: number){
		const dictionary = await this.dictionaryRepository.findOne({
			where: {
				word: word,
				language: {
					id: idLanguage
				}
			},
			relations: {
				language: true
			}
		})
		return dictionary;
	}

	update(id: number, updateDictionaryDto: UpdateDictionaryDto) {
		return `This action updates a #${id} dictionary`;
	}

	remove(id: number) {
		return `This action removes a #${id} dictionary`;
	}
}
