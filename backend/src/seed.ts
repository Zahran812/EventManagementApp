import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Event } from './events/event.entity.js';
import { Ticket } from './tickets/ticket.entity.js';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'EventApp',
  entities: [Event, Ticket],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  console.log('✅ Database terhubung.');

  const eventRepo = AppDataSource.getRepository(Event);
  const ticketRepo = AppDataSource.getRepository(Ticket);

  // Bersihkan data lama (opsional)
  await ticketRepo.delete({});
  await eventRepo.delete({});
  console.log('🗑  Data lama dibersihkan.');

  // Buat 5 event dummy
  const events = await eventRepo.save([
    {
      title: 'Tech Conference Jakarta 2025',
      description: 'Konferensi teknologi terbesar di Indonesia, membahas AI, Cloud, dan Web Development.',
      date: '2025-08-15',
      location: 'Jakarta Convention Center, Jakarta',
    },
    {
      title: 'Bandung Food Festival',
      description: 'Festival kuliner tahunan yang menghadirkan ratusan booth makanan dari seluruh Indonesia.',
      date: '2025-09-05',
      location: 'Alun-alun Bandung, Jawa Barat',
    },
    {
      title: 'Startup Summit Surabaya',
      description: 'Pertemuan para pendiri startup dan investor untuk networking dan pitch session.',
      date: '2025-10-20',
      location: 'Grand City Surabaya, Jawa Timur',
    },
    {
      title: 'Konser Musik Nusantara',
      description: 'Konser musik yang menampilkan artis-artis ternama Indonesia dengan nuansa tradisional.',
      date: '2025-11-01',
      location: 'Gelora Bung Karno, Jakarta',
    },
    {
      title: 'Workshop UI/UX Design',
      description: 'Workshop intensif 2 hari tentang desain antarmuka pengguna dan pengalaman pengguna modern.',
      date: '2025-07-25',
      location: 'Bali Creative Hub, Denpasar',
    },
  ]);

  console.log(`✅ ${events.length} event berhasil dibuat.`);

  // Buat 5 tiket dummy
  const tickets = await ticketRepo.save([
    {
      ordererName: 'Budi Santoso',
      ordererEmail: 'budi.santoso@gmail.com',
      eventId: events[0].id,
    },
    {
      ordererName: 'Siti Rahayu',
      ordererEmail: 'siti.rahayu@yahoo.com',
      eventId: events[0].id,
    },
    {
      ordererName: 'Ahmad Fauzi',
      ordererEmail: 'ahmad.fauzi@email.com',
      eventId: events[1].id,
    },
    {
      ordererName: 'Dewi Kartika',
      ordererEmail: 'dewi.kartika@gmail.com',
      eventId: events[2].id,
    },
    {
      ordererName: 'Rizky Pratama',
      ordererEmail: 'rizky.pratama@email.co.id',
      eventId: events[3].id,
    },
  ]);

  console.log(`✅ ${tickets.length} tiket berhasil dibuat.`);
  console.log('\n🎉 Seed data selesai!');
  console.log('   Jalankan backend dan buka http://localhost:3001/events untuk melihat data.');

  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error saat seed:', err);
  process.exit(1);
});
