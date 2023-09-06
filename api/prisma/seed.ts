import { PrismaClient } from '@prisma/client'
import { packs, products } from './seed-items'
const prisma = new PrismaClient()
async function main() {
  await prisma.products.createMany({ data: products })
  await prisma.packs.createMany({ data: packs })

  const createdProducts = await prisma.products.findMany()
  const createdPacks = await prisma.packs.findMany()

  console.log('Created Products: ', createdProducts)
  console.log('Created Packs: ', createdPacks)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
