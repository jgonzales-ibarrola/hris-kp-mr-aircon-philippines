import { saltAndHashPassword } from "@/lib/password"
import { prisma } from "@/lib/prisma"

export const seedUsers = async () => {
  await prisma.user.upsert({
    where: {
      email: 'admin@mraircon.com'
    },
    create: {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@mraircon.com',
      passwordHash: saltAndHashPassword('mraircon1234'),
    },
    update: {}
  })

  const usersCount = await prisma.user.count()

  console.log(`Users count: ${usersCount}`)
}