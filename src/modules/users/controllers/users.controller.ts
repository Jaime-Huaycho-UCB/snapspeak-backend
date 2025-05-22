import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Response } from 'express';
import { responseError } from 'src/common/helpers/out.helper';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DtoResponse, swaggerRes400, swaggerRes404 } from 'src/common/helpers/classes.dto';
import { UserDto } from '../dto/user.dto';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Get()
	@ApiOperation({ summary: 'Api para obtener un usuario' })
	@ApiResponse({
		description: 'Respuesta en caso de obtener usuario exitosamente',
		status: 200,
		type: [UserDto]
	})
	@ApiResponse(swaggerRes404())
	async findAll(@Res() res: Response) {
		try {
			const users = await this.usersService.findAll();
			return res.status(200).json(users);
		} catch (error) {
			return responseError(error, res);
		}
	}
}
