const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./src/routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
