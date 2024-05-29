import { IsNotEmpty } from 'class-validator'

export default class CreateCustomerQueueDto {
	@IsNotEmpty({ message: 'O campo nome é obrigatório.' })
	name: string

	@IsNotEmpty({ message: 'O campo serviço é obrigatório.' })
	service: string

	@IsNotEmpty({ message: 'O id do expert é obrigatório.' })
	expertId: string
}
