const express = require('express');
const router = express.Router();

// Simple AI response logic
const generateAIResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  // Simple keyword-based responses
  if (message.includes('blog') && message.includes('trending')) {
    return {
      response: "Here are some trending blog topics this week:\n\n1. **AI and Machine Learning** - Latest developments in AI technology\n2. **Sustainable Living** - Eco-friendly lifestyle tips and practices\n3. **Remote Work Productivity** - Tools and strategies for better work-from-home experience\n4. **Mental Health Awareness** - Self-care and wellness content\n5. **Cryptocurrency Updates** - Latest news in the crypto world\n\nThese topics are currently generating high engagement across social media platforms.",
      suggestions: [
        "How can I optimize my blog for SEO?",
        "What's the best time to post on social media?",
        "How do I increase my blog's readership?"
      ]
    };
  }
  
  if (message.includes('title') && message.includes('post')) {
    return {
      response: "Here are some creative title suggestions for your blog post:\n\n1. **'The Ultimate Guide to [Your Topic]'**\n2. **'How I [Achieved Something] in [Timeframe]'**\n3. **'[Number] Proven Ways to [Achieve Goal]'**\n4. **'Why [Common Belief] is Actually Wrong'**\n5. **'The Hidden Truth About [Your Topic]'**\n\nRemember to make your title specific, engaging, and include relevant keywords for better SEO performance.",
      suggestions: [
        "How do I write compelling blog introductions?",
        "What's the ideal blog post length?",
        "How can I make my content more engaging?"
      ]
    };
  }
  
  if (message.includes('summarize') && message.includes('blog')) {
    return {
      response: "I'd be happy to help you summarize your blog post! To provide the most accurate summary, please share the content you'd like me to analyze. I can help you:\n\n• Extract key points and main ideas\n• Create a concise executive summary\n• Identify the most important takeaways\n• Suggest improvements for clarity\n\nJust paste your blog content and I'll create a comprehensive summary for you.",
      suggestions: [
        "How do I write better blog conclusions?",
        "What makes a blog post go viral?",
        "How can I improve my writing style?"
      ]
    };
  }
  
  if (message.includes('seo') || message.includes('optimize')) {
    return {
      response: "Here are key SEO strategies for your blog:\n\n**On-Page SEO:**\n• Use relevant keywords naturally in your content\n• Optimize meta titles and descriptions\n• Include internal and external links\n• Use proper heading structure (H1, H2, H3)\n\n**Technical SEO:**\n• Ensure fast loading times\n• Make your site mobile-friendly\n• Use clean URL structures\n• Implement schema markup\n\n**Content Strategy:**\n• Create high-quality, valuable content\n• Update old posts regularly\n• Use engaging headlines\n• Include multimedia content",
      suggestions: [
        "How do I find the right keywords?",
        "What's the best way to build backlinks?",
        "How can I improve my site's loading speed?"
      ]
    };
  }
  
  // Default response
  return {
    response: "I'm here to help you with your blogging and content creation needs! I can assist with:\n\n• Finding trending blog topics\n• Creating engaging titles\n• Summarizing content\n• SEO optimization tips\n• Content strategy advice\n\nWhat would you like to know about?",
    suggestions: [
      "What blog topics are trending this week?",
      "Suggest a title for my new post.",
      "How can I improve my blog's SEO?"
    ]
  };
};

// POST /api/chatbot/message
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Message is required and must be a string' 
      });
    }
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const aiResponse = generateAIResponse(message);
    
    res.json({
      success: true,
      response: aiResponse.response,
      suggestions: aiResponse.suggestions,
      timestamp: new Date()
    });
    
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process message'
    });
  }
});

// GET /api/chatbot/suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const suggestions = [
      'What blog topics are trending this week?',
      'Suggest a title for my new post.',
      'Summarize this blog post',
      'How can I improve my blog\'s SEO?',
      'What\'s the best time to post on social media?',
      'How do I increase my blog\'s readership?'
    ];
    
    res.json({
      success: true,
      suggestions,
      timestamp: new Date()
    });
    
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch suggestions'
    });
  }
});

module.exports = router; 