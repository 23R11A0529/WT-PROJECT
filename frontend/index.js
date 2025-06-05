<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Food Donation System</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    nav a { margin: 10px; text-decoration: none; color: #007BFF; }
    form { max-width: 400px; margin-top: 20px; }
    input, textarea { width: 100%; margin-bottom: 10px; padding: 8px; }
    .donation-list { margin-top: 30px; }
    .donation { border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; }
  </style>
</head>
<body>
  <h1>Welcome to the Food Donation System</h1>

  <nav>
    <a href="#donate">Donate Food</a>
    <a href="#donations">View Donations</a>
  </nav>

  <section id="donate">
    <h2>Donate Food</h2>
    <form id="donationForm">
      <label for="name">Your Name:</label>
      <input type="text" id="name" required />

      <label for="food">Food Item:</label>
      <input type="text" id="food" required />

      <label for="quantity">Quantity:</label>
      <input type="text" id="quantity" required />

      <label for="location">Pickup Location:</label>
      <input type="text" id="location" required />

      <label for="note">Additional Notes:</label>
      <textarea id="note"></textarea>

      <button type="submit">Submit Donation</button>
    </form>
  </section>

  <section id="donations" class="donation-list">
    <h2>Recent Donations</h2>
    <div id="donationsContainer"></div>
  </section>

  <script>
    // Submit donation
    document.getElementById('donationForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const donation = {
        name: document.getElementById('name').value,
        food: document.getElementById('food').value,
        quantity: document.getElementById('quantity').value,
        location: document.getElementById('location').value,
        note: document.getElementById('note').value,
      };

      const res = await fetch('http://localhost:5000/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donation),
      });

      const data = await res.json();
      alert(data.message);
      document.getElementById('donationForm').reset();
      loadDonations(); // Refresh list
    });

    // Load donations
    async function loadDonations() {
      const res = await fetch('http://localhost:5000/api/donations');
      const donations = await res.json();
      const container = document.getElementById('donationsContainer');
      container.innerHTML = '';

      donations.forEach(d => {
        const div = document.createElement('div');
        div.className = 'donation';
        div.innerHTML = `
          <strong>Donor:</strong> ${d.name}<br/>
          <strong>Food:</strong> ${d.food} (${d.quantity})<br/>
          <strong>Location:</strong> ${d.location}<br/>
          <strong>Note:</strong> ${d.note || 'None'}
        `;
        container.appendChild(div);
      });
    }

    // On page load
    loadDonations();
  </script>
</body>
</html>