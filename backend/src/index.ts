// src/index.ts
import express, { Request, Response, json } from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import { MongoClientOptions } from 'mongodb';
import dotenv from 'dotenv';
import { Person } from './types';
dotenv.config();

const app = express();
app.use(cors());
const port = 5000;
let conn: typeof mongoose;
const collection = "nodes"
const db = "cloud_chef"

const storage = multer.memoryStorage(); // Use memory storage for accessing buffer


const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

// Endpoint to handle file upload and query parameters
app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  const { id } = req.query;
  const uploadedFile = req.file;

  if (!id || !uploadedFile) {
    return res.status(400).json({ error: 'Missing parameters or file' });
  }
  const jsonData: Person[] = JSON.parse(uploadedFile.buffer.toString('utf-8'))
  jsonData.map((person: Person) => person.userId = id as string)

  const c = conn.connection.useDb(db);
  await c.collection(collection).deleteMany({userId: id});
  const createNodes = await c.collection(collection).insertMany(jsonData);
  return res.json({
    message: 'File uploaded successfully',
    data: createNodes
  });
});

app.get('/data', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(200).json({ data: []})
  }
  const connection = conn.connection.useDb(db);
  const result = await connection.collection(collection).find({ ["userId"]: id}).toArray();
  return res.status(200).json({ data: result})
})

app.listen(port, async () => {
  try {
    conn = await mongoose.connect(process.env.MONGODB_URI!, {
    } as MongoClientOptions);
    
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
});
