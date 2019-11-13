import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../tasks.models";

export class TaskStatusValidationPipe implements PipeTransform {
    private taskStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase()

        if (!this.isValidTaskStatus(value)) {
            throw new BadRequestException(`status ${value} is not valid`)
        }

        return value
    }

    private isValidTaskStatus(status): boolean {
        return this.taskStatus.indexOf(status) !== -1
    }
}