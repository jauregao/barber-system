import { Module } from '@nestjs/common'
import { QueuesService } from './queues.service'
import { QueuesController } from './queues.controller'
import { ExpertsModule } from 'src/experts/experts.module'

@Module({
	imports: [ExpertsModule],
	controllers: [QueuesController],
	providers: [QueuesService]
})
export class QueuesModule {}
