export interface CheckPartnerByDocumentRepository {
  checkByDocument: (document: string) => Promise<boolean>
}
