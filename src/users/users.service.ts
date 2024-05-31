import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import createUserDto from './dto/users'
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(data: createUserDto) {
		const pass = await hash(data.password, 10)
		return await this.prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: pass,
				phone: data.phone
			}
		})
	}

	async findUserByEmail(email: string) {
		return await this.prisma.user.findFirst({
			where: {
				email
			}
		})
	}
}
