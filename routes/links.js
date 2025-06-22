const express = require('express');
const router = express.Router();
const {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
  getLinkStats,
} = require('../controllers/linksController');

router.route('/').get(getLinks).post(createLink);

router.route('/:id').put(updateLink).delete(deleteLink);

router.route('/:id/stats').get(getLinkStats);

module.exports = router;
