import {
	BadRequestException,
	Body,
	Controller,
	HttpStatus,
	Post,
	Res,
	UseGuards
} from '@nestjs/common'
import { UsersService } from './users.service'
import createUserDto from './dto/users'
import { Response } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/strategies/jwt-auth.guards'

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async createUser(@Body() data: createUserDto, @Res() res: Response) {
		const userEmail = await this.usersService.findUserByEmail(data.email)
		if (userEmail) {
			throw new BadRequestException(`User ${data.email} already exists`)
		}

		const user = await this.usersService.createUser(data)

		const { id, name, email, phone } = user
		return res.status(HttpStatus.CREATED).json({ id, name, email, phone })
	}
}
