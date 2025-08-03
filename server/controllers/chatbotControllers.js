// Mock AI responses - you can integrate with real AI APIs later
const mockResponses = {
  "what blog topics are trending this week": "Based on current trends, here are some popular blog topics: AI and Machine Learning, Sustainable Living, Remote Work Tips, Digital Marketing Strategies, and Web Development Best Practices.",
  "suggest a title for my new post": "Here are some engaging title ideas: '10 Tips That Will Transform Your Workflow', 'The Ultimate Guide to Modern Web Development', 'Why Everyone is Talking About This New Trend', or 'The Secret to Creating Viral Content'.",
  "summarize this blog post": "I'd be happy to help summarize your blog post! Please share the content you'd like me to summarize, and I'll provide a concise overview of the key points.",
  "how to improve my writing style": "Here are some tips to improve your writing: 1) Write clear, concise sentences 2) Use active voice 3) Vary your sentence structure 4) Read your work aloud 5) Edit ruthlessly 6) Know your audience.",
  "what are the best seo practices": "Key SEO practices include: 1) Use relevant keywords naturally 2) Create quality, original content 3) Optimize meta titles and descriptions 4) Use header tags properly 5) Build quality backlinks 6) Ensure fast page loading 7) Make your site mobile-friendly.",
  "how to increase blog engagement": "To boost engagement: 1) Ask questions in your posts 2) Respond to comments quickly 3) Use compelling headlines 4) Add visuals and infographics 5) Share on social media 6) Create interactive content 7) Build an email list.",
  "default": "That's an interesting question! I'm here to help you with blog topics, content creation, writing tips, and general assistance. What specific area would you like to explore?"
};

// Send chat message and get AI response
const sendMessage = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ 
        success: false,
        error: 'Message is required' 
      });
    }

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find matching response or use default
    const lowerMessage = message.toLowerCase();
    let response = mockResponses.default;

    for (const [key, value] of Object.entries(mockResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }

    res.status(200).json({
      success: true,
      response: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Something went wrong with the chatbot',
      message: error.message 
    });
  }
};

// Get chat suggestions
const getSuggestions = (req, res) => {
  try {
    const suggestions = [
      "What blog topics are trending this week?",
      "Suggest a title for my new post",
      "Summarize this blog post",
      "How to improve my writing style?",
      "What are the best SEO practices?",
      "How to increase blog engagement?"
    ];

    res.status(200).json({
      success: true,
      suggestions
    });

  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch suggestions',
      message: error.message 
    });
  }
};

// Get chat history (optional - for future implementation)
const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    
    res.status(200).json({
      success: true,
      history: [],
      message: "Chat history feature coming soon"
    });

  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch chat history',
      message: error.message 
    });
  }
};

module.exports = {
  sendMessage,
  getSuggestions,
  getChatHistory
};