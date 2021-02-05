import { AddPartnerParams, AddPartner } from '@/domain/usecases'

export class AddPartnerSpy implements AddPartner {
  params: AddPartnerParams

  add (params: AddPartnerParams): void {
    this.params = params
  }
}
