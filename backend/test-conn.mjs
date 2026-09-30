import { DataSource } from 'typeorm';

const ds = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'EventApp',
  synchronize: false,
});

try {
  await ds.initialize();
  console.log('TypeORM connected OK');
  await ds.destroy();
} catch(e) {
  console.error('TypeORM error:', e.message);
}