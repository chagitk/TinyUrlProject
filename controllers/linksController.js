const Link = require('../models/Link');
const User = require('../models/User');

// @desc    Get all links for a user
// @route   GET /api/links
// @access  Private
exports.getLinks = async (req, res, next) => {
  // In a real app, user would be identified from a JWT
  const userId = '68584f7b4f8b0017093ebc82'; // Using the ID of 'Test User 2'

  try {
    const links = await Link.find({ user: userId });
    res.status(200).json({
      success: true,
      count: links.length,
      data: links,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new short link
// @route   POST /api/links
// @access  Private
exports.createLink = async (req, res, next) => {
  const { originalUrl, alias, targetParamName, targetValues } = req.body;
  const userId = '68584f7b4f8b0017093ebc82'; // Using the ID of 'Test User 2'

  try {
    const linkData = {
      originalUrl,
      user: userId,
      targetParamName,
      targetValues,
    };

    if (alias) {
      // User provided a custom alias, check for uniqueness
      const existingLink = await Link.findOne({ shortUrlId: alias });
      if (existingLink) {
        return res.status(400).json({ success: false, msg: 'Alias is already in use.' });
      }
      linkData.shortUrlId = alias;
    } else {
      // If no alias is provided, the model's default will generate a shortid
      // We don't need to do anything here, Mongoose will handle it.
    }

    const newLink = new Link(linkData);
    const link = await newLink.save();

    // Add link to user's links array
    await User.findByIdAndUpdate(userId, { $push: { links: link._id } });

    res.status(201).json({
      success: true,
      data: link,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a link
// @route   DELETE /api/links/:id
// @access  Private
exports.deleteLink = async (req, res, next) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({ msg: 'Link not found' });
    }

    // In a real app, you would also check if the user owns the link

    await link.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a link
// @route   PUT /api/links/:id
// @access  Private
exports.updateLink = async (req, res, next) => {
  try {
    let link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({ msg: 'Link not found' });
    }

    // In a real app, you would also check if the user owns the link

    link = await Link.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: link });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get click statistics for a link
// @route   GET /api/links/:id/stats
// @access  Private
exports.getLinkStats = async (req, res, next) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({ msg: 'Link not found' });
    }

    // In a real app, you would also check if the user owns the link

    const stats = link.clicks.reduce((acc, click) => {
      const key = click.targetParamValue || 'unknown';
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});

    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
