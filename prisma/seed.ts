import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 🔹 Hash du mot de passe
  const hashedPassword = await bcrypt.hash('password123', 12);

  // 🔹 Création des plans d'abonnement
  const basicPlan = await prisma.subscriptionPlan.upsert({
    where: { name: 'BASIC' },
    update: {},
    create: {
      name: 'BASIC',
      price: 0,
      duration: 90,
      maxProducts: 5,
      maxVariantsPerProduct: 3,
      maxImagesPerProduct: 5,
      maxCategories: 3,
      maxReviewsPerMonth: 10,
      maxOrdersPerMonth: 20,
      canUseDiscounts: false,
      canAccessAnalytics: false,
      prioritySupport: false,
    },
  });

  const standardPlan = await prisma.subscriptionPlan.upsert({
    where: { name: 'STANDARD' },
    update: {},
    create: {
      name: 'STANDARD',
      price: 19.99,
      duration: 30,
      maxProducts: 50,
      maxVariantsPerProduct: 10,
      maxImagesPerProduct: 10,
      maxCategories: 10,
      maxReviewsPerMonth: 50,
      maxOrdersPerMonth: 100,
      canUseDiscounts: true,
      canAccessAnalytics: true,
      prioritySupport: false,
    },
  });

  const premiumPlan = await prisma.subscriptionPlan.upsert({
    where: { name: 'PREMIUM' },
    update: {},
    create: {
      name: 'PREMIUM',
      price: 49.99,
      duration: 30,
      maxProducts: 200,
      maxVariantsPerProduct: 20,
      maxImagesPerProduct: 15,
      maxCategories: 20,
      maxReviewsPerMonth: 200,
      maxOrdersPerMonth: 500,
      canUseDiscounts: true,
      canAccessAnalytics: true,
      prioritySupport: true,
    },
  });

  // 🔹 Création d'un utilisateur admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      firstName: 'Super',
      email: 'admin@example.com',
      password: hashedPassword, // Remplace avec un hash sécurisé
      role: 'ADMIN',
    },
  });

  // 🔹 Création d'un utilisateur standard
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      firstName: 'John',
      email: 'user@example.com',
      password: hashedPassword, // Remplace avec un hash sécurisé
      role: 'USER',
    },
  });

  // 🔹 Création d'un utilisateur propriétaire (OWNER)
  const owner = await prisma.user.upsert({
    where: { email: 'owner@example.com' },
    update: {},
    create: {
      name: 'Jane Doe',
      firstName: 'Jane',
      email: 'owner@example.com',
      password: hashedPassword, // Remplace avec un hash sécurisé
      role: 'OWNER',
    },
  });

  // 🔹 Création d'une boutique pour l'OWNER
  const store = await prisma.store.create({
    data: {
      name: "Jane's Shop",
      description: "Une boutique de test pour l'OWNER",
      owner: {
        connect: { id: owner.id },
      },
    },
  });

  // 🔹 Création d'un abonnement pour la boutique avec le plan BASIC
  await prisma.subscription.create({
    data: {
      store: {
        connect: { id: store.id },
      },
      plan: {
        connect: { id: basicPlan.id },
      },
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 90)), // 90 jours plus tard
      status: 'ACTIVE',
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
