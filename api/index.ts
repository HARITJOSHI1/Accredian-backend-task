import express from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({origin: '*'}));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.post('/api/referral', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const referral = await prisma.referral.create({
      data: { name, email },
    });


    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "You've been referred!",
      text: `Hello ${name},\n\nYou've been referred to our platform. Sign up now to get started!`,
    });

    res.status(201).json(referral);
  } catch (error) {
    console.error('Error processing referral:', error);
    res.status(500).json({ error: 'An error occurred while processing the referral' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});