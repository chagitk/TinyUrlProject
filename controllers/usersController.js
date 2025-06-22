const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // In a real app, you'd typically return a JWT here
    res.status(201).json({
      success: true,
      msg: 'User registered successfully',
      data: { id: user.id, name: user.name },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
