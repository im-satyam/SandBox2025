const responses = {
  hello: "Hi there! How can I assist you today?",
  "how are you": "I'm just a bot, but I'm doing great! Thanks for asking.",
  "what is your name": "I'm a chatbot built with Node.js!",
  bye: "Goodbye! Have a great day!",
};

const chatBot = (req, res) => {
  const userMessage = req.body.message;

  // Find response or use default
  const botResponse =
    responses[userMessage] || "I'm not sure how to respond to that.";

  return res.json({ response: botResponse });
};
module.exports = chatBot;
