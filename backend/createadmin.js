const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/User'); // adjust the path as needed

mongoose.connect('mongodb://localhost:27017/repwedo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    const password = 'repwedo'; // plaintext password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username: 'priyansh',  // Set the desired username
      email: 'priyansh@repwedo.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created:', admin);
    mongoose.connection.close();
  } catch (err) {
    console.error('Error creating admin user:', err);
    mongoose.connection.close();
  }
};

createAdmin();
