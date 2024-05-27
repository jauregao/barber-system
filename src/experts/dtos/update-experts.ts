import CreateExpertDto from './create-experts'
import { PartialType } from '@nestjs/mapped-types'

export default class UpdateExpertDto extends PartialType(CreateExpertDto) {}
