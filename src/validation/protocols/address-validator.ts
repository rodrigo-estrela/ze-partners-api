import { Address } from '@/domain/models'

export interface AddressValidator {
  isValid: (data: Address) => boolean
}
