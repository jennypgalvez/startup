const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rental');
const collection = db.collection('house');

async function main() {
  try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);

    // Insert a document
    const house = {
      name: 'Beachfront views',
      summary: 'From your bedroom to the beach, no shoes required',
      property_type: 'Condo',
      beds: 1,
    };
    await collection.insertOne(house);
    console.log('Document inserted successfully');

    // Query documents
    const query = { property_type: 'Condo', beds: { $lt: 2 } };
    const options = {
      sort: { name: -1 },
      limit: 10,
    };
    const cursor = collection.find(query, options);
    const rentals = await cursor.toArray();
    rentals.forEach((i) => console.log(i));

    // Cleanup test document
    await collection.deleteMany(query);
  } catch (ex) {
    console.log(`Connection or operation failed because ${ex.message}`);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();