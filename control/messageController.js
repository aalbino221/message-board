const Message = require('../models/message');
const asyncHandler = require('express-async-handler');

const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
  const messages = await Message.find().sort({ added: -1 });
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

exports.new_get = asyncHandler(async (req, res, next) => {
  res.render('new', { title: 'New' });
});

exports.new_post = [
  body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('text', 'Must contain a message').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('new', { title: 'New' });
      return;
    }
    const message = new Message({
      user: req.body.name,
      text: req.body.text,
      added: new Date(),
    });
    await message.save();
    res.redirect('/');
  }),
];
