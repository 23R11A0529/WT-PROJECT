const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/foodDonationApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const DonationSchema = new mongoose.Schema({
  name: String,
  food: String,
  quantity: String,
  location: String,
  note: String,
  date: { type: Date, default: Date.now },
});

const Donation = mongoose.model('Donation', DonationSchema);

app.post('/api/donate', async (req, res) => {
  const donation = new Donation(req.body);
  await donation.save();
  res.json({ message: 'Donation received!' });
});

app.get('/api/donations', async (req, res) => {
  const donations = await Donation.find().sort({ date: -1 }).limit(10);
  res.json(donations);
});

app.listen(5000, () => console.log('Server started on http://localhost:5000'));