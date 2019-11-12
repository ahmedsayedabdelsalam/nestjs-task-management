import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.models';
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id)
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id)
        task.status = status
        return task
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const task: Task = {
            id: uuid(),
            ...createTaskDto,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }

    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }
}
