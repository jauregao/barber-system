import {
	Body,
	Controller,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
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

	@Patch(':id')
	async attendCustomer(@Param() id: string, @Res() res: Response) {
		const costumer = await this.queuecustomersService.getCustomer(+id)
		if (!costumer) {
			throw new NotFoundException('Cliente não encontrado.')
		}

		await this.queuecustomersService.attendCustomer(+id)
		return res.status(HttpStatus.NO_CONTENT).json()
	}

	@Patch(':id')
	async denyService(@Param() id: string, @Res() res: Response) {
		const costumer = await this.queuecustomersService.getCustomer(+id)
		if (!costumer) {
			throw new NotFoundException('Cliente não encontrado.')
		}

		await this.queuecustomersService.denyService(+id)
		return res.status(HttpStatus.NO_CONTENT).json()
	}
}
