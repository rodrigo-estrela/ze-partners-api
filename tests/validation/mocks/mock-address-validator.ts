import { AddressValidator } from '@/validation/protocols'
import { Address } from '@/domain/models'

export class AddressValidatorSpy implements AddressValidator {
  isAddressValid = true
  data: Address

  isValid (data: Address): boolean {
    this.data = data
    return this.isAddressValid
  }
}
