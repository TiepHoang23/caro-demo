const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
app.use(express.static('build'));
app.get('*', (req, res) => {
  req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
app.listen(port, (err) => {
  if (err) throw err.message;
  console.log(`Server running on port${port}`);
});
