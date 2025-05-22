import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { LanguagesService } from './services/languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Response } from 'express';
import { responseError } from 'src/common/helpers/out.helper';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DtoResponse } from 'src/common/helpers/classes.dto';
import { LanguageDto } from './dto/language.dto';

@ApiTags('Idiomas')
@Controller('languages')
export class LanguagesController {
	constructor(private readonly languagesService: LanguagesService) { }

	@Post()
	@ApiOperation({summary: 'Api para registrar un nuevo idioma'})
	@ApiResponse({
		description: 'Respuesta en caso de registrar el idioma exitosamente',
		status: 200,
		type: DtoResponse
	})
	async create(@Body() data: CreateLanguageDto,@Res() res: Response) {
		try {
			const language = await this.languagesService.create(data);
			return res.status(200).json({
				code: 200,
				message: 'Se creo el idioma exitosamente'
			})
		} catch (error) {
			return responseError(error,res);
		}
	}

	@Get()
	@ApiOperation({summary: 'Api para obtener los idiomas'})
	@ApiResponse({
		description: 'Respuesta en caso de obtener todos los idiaomas exitosamente',
		status: 200,
		type: [LanguageDto]
	})
	async findAll(@Res() res: Response) {
		try {
			const languages = await this.languagesService.findAll();
			return res.status(200).json(languages);
		} catch (error) {
			return responseError(error,res);
		}
	}
}
