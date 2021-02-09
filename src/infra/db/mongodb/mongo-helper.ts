import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    await this.client.db().collection('partners').createIndex({ coverageArea: '2dsphere' })
    await this.client.db().collection('partners').createIndex({ address: '2dsphere' })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map (data: any): any {
    const { _id, ...rest } = data
    return { id: _id, ...rest }
  }
}
