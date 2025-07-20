'use server';

import { database } from '.';

import { deleteAllRedis } from '@/actions/redis';

export const deleteAndDropAllTables = async () => {
  await database.transaction(async (tx) => {
    // Delete all data first
    // await tx.delete(usersTable);

    await deleteAllRedis();

    // Drop all tables
    await tx.execute('SET session_replication_role = replica;');

    // Drop tables (wrap reserved names in quotes)
    await tx.execute('DROP TABLE IF EXISTS "user" CASCADE'); // Reserved keyword

    // Drop any ENUM types if they exist

    // // Re-enable foreign key constraints
    await tx.execute('SET session_replication_role = DEFAULT;');
  });
};
