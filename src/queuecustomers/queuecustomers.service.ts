import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import CreateCustomerQueueDto from './dtos/create-queueCustomer'

@Injectable()
export class QueuecustomersService {
	constructor(private readonly prisma: PrismaService) {}

	async addCustomer(data: CreateCustomerQueueDto) {
		const queue = await this.getExpertQueueToday(data.expertId)
		return await this.prisma.queueCustomer.create({
			data: {
				name: data.name,
				service: data.service,
				queueId: queue.id
			}
		})
	}

	async getExpertQueueToday(expertId: string) {
		return await this.prisma.queue.findFirst({
			where: {
				expertId,
				createdAt: {
					equals: new Date()
				}
			}
		})
	}
}
