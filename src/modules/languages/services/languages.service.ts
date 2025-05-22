import { HttpException, Injectable } from '@nestjs/common';
import { CreateLanguageDto } from '../dto/create-language.dto';
import { UpdateLanguageDto } from '../dto/update-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../entities/language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguagesService {
	constructor(
		@InjectRepository(Language)
		private readonly languageRepository: Repository<Language>
	){}

	async create(data: CreateLanguageDto) {
		const language = new Language();
		language.code = data.code;
		language.name = data.name;
		const languageSaved = await this.languageRepository.save(language);
		return languageSaved;
	}

	async findAll() {
		const languages = await this.languageRepository.find();
		return languages;
	}

	async findOne(idLanguage: number) {
		if (isNaN(idLanguage)){
			throw new HttpException('El parametro (idLanguage) es invalido',400);
		}
		const language = await this.languageRepository.findOne({
			where: {
				id: idLanguage
			}
		})
		if (!language){
			throw new HttpException('No se encontro el idioma',404);
		}
		return language;
	}

	async findByCode(code: number){
		if (isNaN(code)){
			throw new HttpException('El parametro (code) es invalido',400);
		}
		const language = await this.languageRepository.findOne({
			where: {
				code: code
			}
		})
		if (!language){
			throw new HttpException('No se encontro el idioma',404);
		}
		return language;
	}
}
