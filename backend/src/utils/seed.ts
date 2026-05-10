import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const cities = [
  {
    id: 'city-1', name: 'Paris', country: 'France', region: 'Europe',
    image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    avg_daily_cost: 180, popularity_score: 98, flag_emoji: '🇫🇷',
    description: 'The City of Light dazzles with iconic landmarks, world-class cuisine, and unmatched romance.',
  },
  {
    id: 'city-2', name: 'Tokyo', country: 'Japan', region: 'Asia',
    image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    avg_daily_cost: 150, popularity_score: 96, flag_emoji: '🇯🇵',
    description: 'A mesmerizing blend of ultramodern and traditional, from neon-lit skyscrapers to historic temples.',
  },
  {
    id: 'city-3', name: 'New York', country: 'United States', region: 'North America',
    image_url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    avg_daily_cost: 220, popularity_score: 97, flag_emoji: '🇺🇸',
    description: 'The city that never sleeps — towering skylines, Broadway magic, and neighborhoods alive with energy.',
  }
];

const activities = [
  { id: 'act-1', city_id: 'city-1', title: 'Eiffel Tower Visit', category: 'sightseeing', duration_minutes: 180, price: 26, rating: 4.8, image_url: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400&q=80', description: 'Ascend the iconic iron lattice tower for panoramic views of Paris.' },
  { id: 'act-2', city_id: 'city-1', title: 'Louvre Museum', category: 'culture', duration_minutes: 240, price: 17, rating: 4.9, image_url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80', description: 'Home to the Mona Lisa and 380,000 objects spanning 9,000 years of history.' },
  { id: 'act-5', city_id: 'city-2', title: 'Shibuya Crossing Experience', category: 'sightseeing', duration_minutes: 60, price: 0, rating: 4.5, image_url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&q=80', description: 'Stand in the world\'s busiest pedestrian crossing, a symbol of Tokyo.' }
];

async function main() {
  console.log('Start seeding...');

  // 1. Create a test user
  const password_hash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@traveloop.com' },
    update: {},
    create: {
      email: 'admin@traveloop.com',
      name: 'Admin Explorer',
      password_hash,
      role: 'admin',
      profile: {
        create: {
          bio: 'Ready to travel the world.',
          home_currency: 'USD',
          preferred_region: 'Europe'
        }
      }
    },
  });
  console.log(`User created: ${user.email}`);

  // 2. Insert cities
  for (const city of cities) {
    await prisma.city.upsert({
      where: { id: city.id },
      update: city,
      create: city,
    });
  }
  console.log(`Created ${cities.length} cities.`);

  // 3. Insert activities
  for (const act of activities) {
    await prisma.activity.upsert({
      where: { id: act.id },
      update: act,
      create: act,
    });
  }
  console.log(`Created ${activities.length} activities.`);

  // 4. Create a sample trip
  const trip = await prisma.trip.create({
    data: {
      user_id: user.id,
      title: 'European Adventure',
      description: 'Exploring the best of Europe.',
      destination: 'Europe',
      start_date: new Date('2026-06-01'),
      end_date: new Date('2026-06-15'),
      traveler_count: 2,
      trip_type: 'couple',
      status: 'upcoming',
      stops: {
        create: [
          {
            city_id: 'city-1',
            day_number: 1,
            order_index: 0,
            arrival_date: new Date('2026-06-01'),
            departure_date: new Date('2026-06-05'),
            transport_mode: 'flight',
            notes: 'First stop in Paris!'
          }
        ]
      },
      budgets: {
        create: [
          { category: 'transport', amount: 1200, spent_amount: 850 },
          { category: 'accommodation', amount: 2000, spent_amount: 0 },
          { category: 'food', amount: 800, spent_amount: 0 }
        ]
      },
      packing_items: {
        create: [
          { item_name: 'Passport', completed: true, category: 'essentials' },
          { item_name: 'Camera', completed: false, category: 'electronics' },
          { item_name: 'Power Adapter', completed: false, category: 'electronics' }
        ]
      }
    }
  });
  console.log(`Created sample trip: ${trip.title}`);

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
