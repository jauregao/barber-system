import { TUser } from './../../../types/user'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET_KEY
		})
	}

	async validate(payload: TUser) {
		const user = await this.usersService.findUserById(payload.id)

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone
		}
	}
}
