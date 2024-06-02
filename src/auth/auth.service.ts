import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { TUser } from 'src/types/user'
@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(email: string, pass: string): Promise<TUser> {
		const user = await this.usersService.findUserByEmail(email)
		if (!user) {
			return null
		}

		const validPass = await compare(pass, user.password)

		if (!validPass) {
			return null
		}

		return user
	}

	async login(user: TUser) {
		const payload = { id: user.id }
		return {
			access_token: this.jwtService.sign(payload)
		}
	}
}
