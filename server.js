const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/report'));
app.use('/api/courses', require('./routes/course'));
app.use('/api/ratings', require('./routes/rating'));
app.use('/api/monitoring', require('./routes/monitoring'));

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});
