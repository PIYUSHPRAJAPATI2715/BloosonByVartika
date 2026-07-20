# Blossom by Vartika - Backend API & MongoDB Architecture

This directory contains the Node.js + Express + MongoDB REST API backend for **Blossom by Vartika**.

## Setup & Local Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup `.env` file (copy from `.env.example`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/blossom_db
   JWT_SECRET=blossom_luxury_secret
   CLIENT_URL=http://localhost:5173
   ```

3. Seed database with luxury hamper products and sample data:
   ```bash
   npm run seed
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Render Deployment Guide

1. Create a **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository and set Root Directory to `server` (or point build command to `cd server && npm install`).
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas Connection String
   - `JWT_SECRET`: Random secure string
   - `CLIENT_URL`: Your deployed frontend URL (e.g. `https://blossom-by-vartika.onrender.com` or Vercel URL)
