// server.js
const express = require('express');
const app = express();
const stockRoutes = require('./routes/stockRoutes');

app.use(express.json());
app.use('/api', stockRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
