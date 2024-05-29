import {
	Body,
	Controller,
	HttpStatus,
	NotFoundException,
	Post,
	Res
} from '@nestjs/common'
import { QueuecustomersService } from './queuecustomers.service'
import { Response } from 'express'
import CreateCustomerQueueDto from './dtos/create-queueCustomer'

@Controller('queuecustomers')
export class QueuecustomersController {
	constructor(private readonly queuecustomersService: QueuecustomersService) {}

	@Post()
	async addCustomer(
		@Body() data: CreateCustomerQueueDto,
		@Res() res: Response
	) {
		const queueExists = await this.queuecustomersService.getExpertQueueToday(
			data.expertId
		)
		if (!queueExists) {
			throw new NotFoundException('Fila não existe.')
		}

		const customer = await this.queuecustomersService.addCustomer({
			name: data.name,
			service: data.service,
			queueId: queueExists.id
		})
		return res.status(HttpStatus.CREATED).json(customer)
	}
}
