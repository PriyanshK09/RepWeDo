const bcrypt = require('bcryptjs');

const password = 'pk@dk1234';
const storedHash = '$2a$10$d/0EOVFG8ORhS5Fbv1JIGOr9p3RlTJBBoMeNvHKFxBUlmtRkTlcyq'; // Hash from DB

bcrypt.compare(password, storedHash, (err, result) => {
  if (err) throw err;
  console.log('Password Match:', result); // Should be true if the password matches
});
