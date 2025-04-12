require('dotenv').config({ path: '../.env' });
const { Client } = require('pg');

async function testConnection() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log('Attempting to connect to PostgreSQL database...');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Port: ${process.env.DB_PORT}`);
    console.log(`User: ${process.env.DB_USERNAME}`);
    console.log(`Database: ${process.env.DB_NAME}`);
    
    await client.connect();
    console.log('Connection successful! Database is up and running.');
    
    const res = await client.query('SELECT NOW()');
    console.log('Current database time:', res.rows[0].now);
    
    await client.end();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testConnection(); 