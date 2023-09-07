import { Injectable } from '@nestjs/common'
import { PacksRepository } from '../packs.repository'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class PrismaPacksRepository implements PacksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getManyByCode(code: number) {
    return this.prisma.packs.findMany({
      where: { pack_id: code }
    })
  }
}
