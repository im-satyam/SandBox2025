const responses = {
  "What does this website do?": "This website helps you monitor if your email or password has been involved in any data breaches, checks websites for phishing risks, and gives phishing scores to websites so you can browse securely.", 
  
  "What is phishing?": "Phishing is a type of online scam where attackers pretend to be a trustworthy entity, like a bank or an online service, to trick you into sharing personal information, such as passwords or credit card numbers.",

  "What is a phishing score?": "A phishing score is a rating that tells you how secure a website is. The score ranges from 1 to 10, with 10 being the safest. We calculate this score based on factors like website security and reputation.",

  "What is a data breach?": "A data breach occurs when sensitive information, like your email address, password, or financial details, is accessed or stolen by unauthorized individuals. This can happen due to hacking, weak security, or accidental exposure.",

  "How can I contact customer support?": "You can reach customer support by clicking on the 'Contact Us' button at the bottom of the page or by emailing support@[company].com.",

  "How are you?": "I'm just a chatbot, but thanks for asking! How can I assist you today?",

  "Hi!": "Hello! How can I assist you today?",

  "Hello!": "Hi there! How can I help you?",

  "bye": "Goodbye! Have a great day!"
};

const chatBot = (req, res) => {
  const userMessage = req.body.message;

  // Find response or use default
  const botResponse =
    responses[userMessage] || "I'm not sure how to respond to that.";

  return res.json({ response: botResponse });
};
module.exports = chatBot;
