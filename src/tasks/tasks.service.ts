import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.models';
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks
    }

    getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto
        let tasks = this.tasks

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }

        return tasks
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find(task => task.id === id)

        if (!task) {
            throw new NotFoundException(`Task with id ${id} is not Found!`)
        }

        return task
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
        const found = this.getTaskById(id)

        this.tasks = this.tasks.filter(task => task.id !== found.id)
    }
}
