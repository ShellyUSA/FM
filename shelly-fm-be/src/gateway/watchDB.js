import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: "*"}});

import { MONGO } from "../config.js";

export const watchDB = async () => {
  mongoose.connect(MONGO, {useNewUrlParser: true, useUnifiedTopology: true});

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function() {
    console.log("Connected to the database!");

    const changeStream = db.collection('devicesCurrentData').watch();
    
// existing code...

changeStream.on('change', (change) => {
  console.log(change); // You could see the change here

  // If the operation is an update, send the updated fields and their new values
  if (change.operationType === 'update') {
    io.emit('dbchange', change.updateDescription.updatedFields);
  } else if (change.operationType === 'replace') {
    io.emit('dbchange', change.fullDocument);
  } else if (change.operationType === 'insert') {
    io.emit('dbchange', change.fullDocument);
  }
  // add conditions for other operation types if needed...
});


  });
}


// try {
//   const mongoClient: MongoClient = new MongoClient(process.env.MONGODB_RO_URI || 'mongodb://mongodb:27017', {replicaSet: "rs0", directConnection: true});
//   const mongoDb: Db = new Db(mongoClient, "admin");
//   const response = await mongoDb.admin().command({ replSetInitiate: {} }, {})
// } catch (error) {
//   console.error(error)
// }