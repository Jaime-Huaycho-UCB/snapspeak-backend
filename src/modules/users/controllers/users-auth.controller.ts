import { Body, Controller, Post, Res } from "@nestjs/common";
import { UsersAuthService } from "../services/users-auth.service";
import { RegisterDto } from "../dto/register.dto";
import { Response } from "express";
import { responseError } from "src/common/helpers/out.helper";
import { LoginDto } from "../dto/login.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DtoResponse, swaggerRes400, swaggerRes404 } from "src/common/helpers/classes.dto";
import { UserDto } from "../dto/user.dto";

@ApiTags('Autenticacion')
@Controller('auth')
export class UsersAuthController {
    constructor(private readonly usersAuthService: UsersAuthService){}

    @Post('/register')
    @ApiOperation({summary: 'Api para registrar un usuario'})
    @ApiResponse({
        description: 'Respuesta en caso de registrar exitosamente usuario',
        status: 200,
        type: DtoResponse
    })
    @ApiResponse(swaggerRes400())
    @ApiResponse(swaggerRes404())
    async register(@Body() data: RegisterDto,@Res() res: Response){
        try {
            const user = await this.usersAuthService.register(data);
            return res.status(200).json({
                code: 200,
                message: 'Se registro al usurio exitosamente'
            });
        } catch (error) {
            return responseError(error,res);
        }
    }

    @Post('/login')
    @ApiOperation({summary: 'Api para iniciar sesion'})
    @ApiResponse({
        description: 'Respuesta en caso de inicar sesion exitosamente',
        status: 200,
        type: UserDto
    })
    @ApiResponse(swaggerRes400())
    @ApiResponse(swaggerRes404())
    async login(@Body() data: LoginDto,@Res() res: Response){
        try {
            const user = await this.usersAuthService.login(data);
            return res.status(200).json(user);
        } catch (error) {
            return responseError(error,res);
        }
    }
}