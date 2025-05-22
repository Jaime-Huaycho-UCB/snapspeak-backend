import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "../dto/register.dto";
import { UsersService } from "./users.service";
import { HashService } from "src/common/helpers/hash.helper";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class UsersAuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly hashService: HashService,
        private readonly usersService: UsersService
    ){}

    async register(data: RegisterDto){
        data.password = await this.hashService.hash(data.password);
        const userSaved = await this.usersService.create(data);
        return userSaved;
    }

    async login(data: LoginDto){
        const user = await this.usersService.findByUsername(data.username);
        if (!(await this.hashService.compare(data.password,user.password))){
            throw new HttpException('Credenciales incorrectas',401);
        }
        return {
            id: user.id,
            username: user.username
        }
    }
}