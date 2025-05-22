import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserVocabulariesService } from './services/user-vocabularies.service';
import { CreateUserVocabularyDto } from './dto/create-user-vocabulary.dto';
import { UpdateUserVocabularyDto } from './dto/update-user-vocabulary.dto';
import { Response } from 'express';
import { responseError } from 'src/common/helpers/out.helper';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DtoResponse, swaggerRes404 } from 'src/common/helpers/classes.dto';
import { UserVocabularyDto } from './dto/user-vocabulary.dto';

@Controller('user-vocabularies')
export class UserVocabulariesController {
	constructor(private readonly userVocabulariesService: UserVocabulariesService) { }

	@Post()
	@ApiOperation({summary: 'Api para agregar una traduccion al vocabulario'})
	@ApiResponse({
		description: 'Respuesta en caso de agregar exitosamente la traduccion',
		status: 200,
		type: DtoResponse
	})
	@ApiResponse(swaggerRes404())
	async create(@Body() data: CreateUserVocabularyDto,@Res() res: Response) {
		try {
			const vocabularySaved = await this.userVocabulariesService.create(data);
			return res.status(200).json({
				code: 200,
				message: 'La traduccion se guardo en el diccionario exitosamente'
			})
		} catch (error) {
			return responseError(error,res);
		}
	}

	@Get(':idUser')
	@ApiOperation({summary: 'Api para obtener el vocabulario de un usuario'})
	@ApiResponse({
		description: 'Respuesta en caso de obtener el vocabulario de un usurio exitosamente',
		status: 200,
		type: [UserVocabularyDto]
	})
	@ApiResponse(swaggerRes404())
	async findAll(@Param('idUser') idUser: string,@Res() res: Response) {
		try {
			const vocabularies = await this.userVocabulariesService.findAll(parseInt(idUser));
			return res.status(200).json(vocabularies)
		} catch (error) {
			return responseError(error,res);
		}
	}

}
