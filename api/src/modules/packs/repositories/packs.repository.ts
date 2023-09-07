import { packs } from '@prisma/client'

export abstract class PacksRepository {
  abstract getManyByCode(code: number): Promise<packs[]>
}
