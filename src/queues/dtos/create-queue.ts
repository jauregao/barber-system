import { IsNotEmpty } from 'class-validator'

export default class CreateQueueDto {
	@IsNotEmpty({ message: 'É obrigatório informar um expert.' })
	expertId: string
}
