require('dotenv').config();

const mongoose = require('mongoose');
const Message = require('./models/message'); // Import the Message model

// Replace with your MongoDB connection string
const mongoDB = `mongodb+srv://${process.env.SECRET_USER}:${process.env.SECRET_PASS}@cluster0.nfqh7wx.mongodb.net/message-board?retryWrites=true&w=majority`;

async function main() {
  await mongoose.connect(mongoDB);

  await createAllMessages();

  console.log('Messages added to the database.');

  mongoose.connection.close();
}

main().catch((err) => console.error(err));

const createMessage = async (text, user, added) => {
  const message = new Message({ text, user, added });
  await message.save();
};

const createAllMessages = async () => {
  await Promise.all([
    createMessage('Hi there!', 'Amando', new Date()),
    createMessage('Hello World', 'Charles', new Date()),
  ]);
};
