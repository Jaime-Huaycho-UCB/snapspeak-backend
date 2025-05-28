import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { DictionaryService } from './services/dictionary.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { responseError } from 'src/common/helpers/out.helper';
import { DtoResponse } from 'src/common/helpers/classes.dto';
import { WordDto } from './dto/word.dto';

@ApiTags('Diccionario')
@Controller('dictionary')
export class DictionaryController {
	constructor(private readonly dictionaryService: DictionaryService) { }

	@Post()
	@ApiOperation({summary: 'Api para agregar una palabra al diccionario global'})
	@ApiResponse({
		description: 'Respuesta en caso de agregar la palabra exitosamente',
		status: 200,
		type: DtoResponse
	})
	async create(@Body() data: CreateDictionaryDto,@Res() res: Response) {
		try {
			const wordSaved = await this.dictionaryService.create(data);
			return res.status(200).json({
				code: 200,
				message: 'La palabra se agrego al diccionario global exitosamente'
			})
		} catch (error) {
			return responseError(error,res);
		}
	}

	@Get()
	@ApiOperation({summary: 'Api para obtener todas las palabras del diccionario'})
	@ApiResponse({
		description: 'Respuesta en caso de obtener el diccionario exitosamente',
		status: 200,
		type: [WordDto]
	})
	async findAll(@Res() res: Response) {
		try {
			const dictionary = await this.dictionaryService.findAll();
			return res.status(200).json(dictionary);
		} catch (error) {
			return responseError(error,res);
		}
	}

	@Get(':word/:idLanguage')
	@ApiOperation({summary: 'Api para obtener una palabra del diccionario por palabra e idioma'})
	@ApiResponse({
		description: 'respuesta en caso de obtener la palabra exisamente',
		status: 200,
		type: WordDto
	})
	async findOneByWord(@Param('word') word: string,@Param('idLanguage') idLanguage: string,@Res() res: Response){
		try {
			const dictionary = await this.dictionaryService.findOneByWord(word,parseInt(idLanguage));
			return res.status(200).json(dictionary);
		} catch (error) {
			return responseError(error,res);
		}
	}
}
