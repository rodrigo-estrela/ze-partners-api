export class DocumentInUseError extends Error {
  constructor () {
    super('The received document is already in use')
    this.name = 'DocumentInUseError'
  }
}
