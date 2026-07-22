const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB().then(async () => {
  try {
    const Setting = require('./models/Setting');
    const settings = await Setting.findOne();
    if (settings) {
      let changed = false;
      const fields = ['announcementText', 'heroHeading', 'heroSubheading', 'aboutTitle', 'aboutHeading', 'aboutDescription'];
      fields.forEach(f => {
        if (settings[f]) {
          let val = settings[f];
          if (val.includes('(Updated via API)')) {
            val = val.replace('(Updated via API)', '').trim();
            settings[f] = val;
            changed = true;
          }
          if (val.includes('(UPDATED)')) {
            val = val.replace('(UPDATED)', '').trim();
            settings[f] = val;
            changed = true;
          }
          if (val.endsWith('•') || val.endsWith('-')) {
            val = val.slice(0, -1).trim();
            settings[f] = val;
            changed = true;
          }
        }
      });
      if (changed) {
        await settings.save();
        console.log("🌸 Startup DB Cleanup: Removed '(Updated via API)' successfully!");
      }
    }
  } catch (dbErr) {
    console.error("Startup DB clean error:", dbErr);
  }
}).catch(err => console.warn("Startup connectDB callback error:", err));

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Blossom by Vartika - Luxury Studio API',
    version: 'v4-raw-large-uploads-supported',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`🌸 Blossom by Vartika Backend running on http://localhost:${PORT}`);
});
