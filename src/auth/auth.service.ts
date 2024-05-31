import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser(email: string, pass: string) {
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
}
