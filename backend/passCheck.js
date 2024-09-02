const bcrypt = require('bcryptjs');

const password = 'repwedo';
const storedHash = '$2a$10$quU4SMzlgd.6MMC.2qKI6OrONYhGTJrGZSLsEK6IGNbwOHXvoo5hy'; // Hash from DB

bcrypt.compare(password, storedHash, (err, result) => {
  if (err) throw err;
  console.log('Password Match:', result); // Should be true if the password matches
});
