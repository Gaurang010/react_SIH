const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/verify', (req, res) => {
  const { keystrokes, mouseMovements } = req.body;
  // Add logic here for verifying keystrokes or mouse movements
  if (keystrokes.length > 0 && mouseMovements.length > 0) {
    res.json({ status: 'success', message: 'Verified successfully' });
  } else {
    res.status(400).json({ status: 'fail', message: 'Verification failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
