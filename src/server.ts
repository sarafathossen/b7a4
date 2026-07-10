import { Server } from 'http';
import app from './app';
import config from './config';
import { prisma } from './lib/prisma';

let server: Server;

async function main() {
  try {
    // ডাটাবেজ কানেকশন সফলভাবে কাজ করছে কিনা চেক করা
    await prisma.$connect();
    console.log('📶 Database connected successfully!');

    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
  }
}

main();

// আনহ্যান্ডেলড রিজেকশন হ্যান্ডেল করা
process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected, shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected, shutting down...`);
  process.exit(1);
});