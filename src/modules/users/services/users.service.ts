import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	){}

	async create(data: CreateUserDto) {
		const user = new User();
		user.username = data.username;
		user.password = data.password;
		const userSaved = await this.userRepository.save(user);
		return userSaved;
	}

	async findByUsername(username: string){
		const user = await this.userRepository.findOne({
			where: {
				username: username
			}
		})
		if (!user){
			throw new HttpException('El usuario no se encontro',404);
		}
		return user;
	}

	async findOne(idUser: number){
		const user = await this.userRepository.findOne({
			where: {
				id: idUser
			}
		})
		if (!user){
			throw new HttpException('No se encontro al usuario',404);
		}
		return user;
	}

	async findAll(){
		const user = await this.userRepository.find();
		return user;
	}

	async remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
