# Event Management App

Web untuk melihat daftar event dan memesan tiket.

## Fitur

- Melihat semua event, dalam tampilan kartu atau daftar.
- Menambah, mengubah, dan menghapus event.
- Memesan tiket cukup dengan mengisi nama dan email.
- Melihat semua tiket yang sudah dipesan, dan mencarinya berdasarkan nama event.

## Halaman

| Halaman | Alamat | Gunanya |
|---------|--------|---------|
| Beranda | `/` | Daftar event, tempat menambah, mengubah, menghapus, dan memesan tiket |
| Tambah event | `/events/new` | Membuat event baru |
| Edit event | `/events/:id/edit` | Mengubah event |
| Pesan tiket | `/events/:id/book` | Memesan tiket |
| Daftar tiket | `/tickets` | Melihat dan mencari tiket |

## Cara kerja di balik layar

Web (port 3000) meminta data ke server (port 3001), lalu server menyimpannya di database PostgreSQL. Alamat server berikut yang dipakai web:

| Alamat | Tugasnya |
|--------|----------|
| `GET /events` | Ambil semua event |
| `POST /events` | Buat event baru |
| `PATCH /events/:id` | Ubah event |
| `DELETE /events/:id` | Hapus event |
| `GET /events/most-tickets` | Event dengan tiket terbanyak |
| `GET /events/least-tickets` | Event dengan tiket tersedikit |
| `GET /tickets` | Ambil semua tiket, bisa dicari dengan `?eventName=kata` |
| `POST /tickets` | Pesan tiket baru |

Kalau ada yang salah, server membalas dengan kode 400 (data tidak valid), 404 (data tidak ditemukan), atau 500 dan 503 (masalah di server atau database).

## Cara menjalankan

Siapkan Node.js 18+ dan PostgreSQL 14+, lalu buat database `EventApp` (user dan password: `postgres`). Tabel dibuat otomatis.

```bash
# Server
cd backend
npm install
npm run start:dev      # jalan di http://localhost:3001
npm run seed           # opsional: isi data contoh

# Web
cd frontend
npm install
npm run dev            # jalan di http://localhost:3000
```

## Struktur folder

```
EventManagementApp/
├── backend/     # Server (NestJS): event, tiket, dan penanganan error
└── frontend/    # Web (Next.js): halaman, komponen tampilan, dan pemanggil API
```
