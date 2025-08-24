/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient, Role, ClientStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const SEED_CONFIG = {
  ADMIN_USERS: 2,
  REGULAR_USERS: 8,
  CLIENTS_PER_USER: 3,
  NOTES_PER_CLIENT: 4
};

async function cleanDatabase() {
  console.log('🧹 Cleaning existing data...');

  await prisma.note.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Database cleaned');
}

async function createUsers() {
  console.log('👥 Creating users...');

  const users: unknown[] = [];

  for (let i = 0; i < SEED_CONFIG.ADMIN_USERS; i++) {
    const adminUser = await prisma.user.create({
      data: {
        email: `admin${i + 1}@example.com`,
        name: faker.person.firstName(),
        password: faker.internet.password(),
        role: Role.ADMIN,
        avatar: faker.image.avatar(),
        isActive: true
      }
    });
    users.push(adminUser);
  }

  for (let i = 0; i < SEED_CONFIG.REGULAR_USERS; i++) {
    const regularUser = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.firstName(),
        password: faker.internet.password(),
        role: Role.USER,
        avatar: Math.random() > 0.3 ? faker.image.avatar() : null,
        isActive: Math.random() > 0.1
      }
    });
    users.push(regularUser);
  }

  console.log(
    `✅ Created ${users.length} users (${SEED_CONFIG.ADMIN_USERS} admins, ${SEED_CONFIG.REGULAR_USERS} regular)`
  );
  return users;
}

async function createClients(users: any[]) {
  console.log('🏢 Creating clients...');

  const clients: unknown[] = [];

  for (const user of users) {
    const clientCount =
      Math.floor(Math.random() * (SEED_CONFIG.CLIENTS_PER_USER * 2)) + 1;

    for (let i = 0; i < clientCount; i++) {
      const client = await prisma.client.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: Math.random() > 0.2 ? faker.phone.number() : null,
          company: Math.random() > 0.3 ? faker.company.name() : null,
          status:
            Math.random() > 0.15 ? ClientStatus.ACTIVE : ClientStatus.INACTIVE,
          ownerId: user.id
        }
      });
      clients.push(client);
    }
  }

  console.log(`✅ Created ${clients.length} clients`);
  return clients;
}

async function createNotes(users: any[], clients: any[]) {
  console.log('📝 Creating notes...');

  const notes: unknown[] = [];

  for (const client of clients) {
    const noteCount = Math.floor(
      Math.random() * (SEED_CONFIG.NOTES_PER_CLIENT * 2)
    );

    for (let i = 0; i < noteCount; i++) {
      const noteAuthor =
        Math.random() > 0.2
          ? users.find((u) => u.id === client.ownerId)
          : faker.helpers.arrayElement(users);

      const note = await prisma.note.create({
        data: {
          content: faker.lorem.paragraph({ min: 1, max: 4 }),
          image: Math.random() > 0.7 ? faker.image.url() : null,
          isImportant: Math.random() > 0.8,
          clientId: client.id,
          userId: noteAuthor.id,
          createdAt: faker.date.between({
            from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            to: new Date()
          })
        }
      });
      notes.push(note);
    }
  }

  console.log(`✅ Created ${notes.length} notes`);
  return notes;
}

async function printSummary() {
  console.log('\n📊 Database Summary:');

  const counts = await Promise.all([
    prisma.user.count(),
    prisma.client.count(),
    prisma.note.count()
  ]);

  console.log(`👥 Users: ${counts[0]}`);
  console.log(`🏢 Clients: ${counts[1]}`);
  console.log(`📝 Notes: ${counts[2]}`);

  const adminCount = await prisma.user.count({ where: { role: Role.ADMIN } });
  const activeClients = await prisma.client.count({
    where: { status: ClientStatus.ACTIVE }
  });
  const importantNotes = await prisma.note.count({
    where: { isImportant: true }
  });

  console.log(`\n🔍 Additional Info:`);
  console.log(`👑 Admin users: ${adminCount}`);
  console.log(`✅ Active clients: ${activeClients}`);
  console.log(`⭐ Important notes: ${importantNotes}`);
}

async function main() {
  try {
    console.log('🌱 Starting database seeding...\n');

    await cleanDatabase();

    const users = await createUsers();
    const clients = await createClients(users);
    await createNotes(users, clients);

    await printSummary();

    console.log('\n🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
