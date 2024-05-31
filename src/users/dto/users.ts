import { IsEmail, IsNotEmpty } from 'class-validator'

export default class createUserDto {
	@IsNotEmpty({ message: 'O nome é obrigatório' })
	name: string

	@IsNotEmpty({ message: 'O email é obrigatório' })
	@IsEmail({}, { message: 'O campo precisa ter formato de email válido.' })
	email: string

	@IsNotEmpty({ message: 'A senha é obrigatório' })
	password: string

	phone: string
}
