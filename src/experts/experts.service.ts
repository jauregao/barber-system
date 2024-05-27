import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import CreateExpertDto from './dtos/create-experts'

@Injectable()
export class ExpertsService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAllExperts() {
		return await this.prismaService.expert.findMany()
	}

	async findExpertByEmail(email: string) {
		return await this.prismaService.expert.findFirst({
			where: {
				email
			}
		})
	}

	async createExpert(data: CreateExpertDto): Promise<CreateExpertDto> {
		return await this.prismaService.expert.create({ data })
	}

	async updateExpert(data: CreateExpertDto) {
		return await this.prismaService.expert.update({
			data,
			where: {
				email: data.email
			}
		})
	}

	async deleteExpert(email: string) {
		return await this.prismaService.expert.delete({ where: { email } })
	}
}
