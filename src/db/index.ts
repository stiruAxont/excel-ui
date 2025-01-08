import { drizzle } from 'drizzle-orm/neon-http';
// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-serverless';

const db = drizzle(process.env.DATABASE_URL!);
// const sql = neon(process.env.DATABASE_URL!);
// const db = drizzle({ client: sql });

export {
    db,
}