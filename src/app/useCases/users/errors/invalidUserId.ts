import { IDomainError } from './domainError'

export class InvalidUserIdError extends Error implements IDomainError {
  constructor (id: string) {
    super(`This id ${id} is invalid!`)
    this.message = 'InvalidUserIdError'
  }
}
