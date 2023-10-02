const express = require('express')

const Sessions = require('./models/sessions')

const router = express.Router()

router.get("/test", (req, res) => {
  res.send({ msg: "you are amazing!" })
});

router.post('/users/:userId/sessions', async (req, res) => {
	const { userId } = req.params;
	if (!userId) {
	  return res.status(400).json({ error: 'User ID is required' });
	}
	try {
	  // Check if the userId is provided in the path parameter

  
	  // Get the session data from the request body
	  const { user, title, messages } = req.body;
  
	  // Validate that required data is provided
	  if (!user || !title || !messages) {
		return res.status(400).json({ error: 'User, title, and messages are required' });
	  }
  
	  // Create a new session
	  const newSession = new Sessions({
		user:userId,
		title:"",
		createdAt: new Date(),
		messages:[],
	  });
  
	  // Save the session to the database
	  const savedSession = await newSession.save();
  
	} catch (error) {
	  console.error('Error creating session:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

router.get('/users/:userId/sessions', async (req, res) => {
	try {
	  // Check if the userId is provided in the path parameter
	  const { userId } = req.params;
	  if (!userId) {
		return res.status(400).json({ error: 'User ID is required' });
	  }
  
	  // Query the database to retrieve sessions for the specified user
	  const sessions = await Sessions.find({ user: userId }, '_id user title createdAt');
  
	  // Return the retrieved sessions as a response
	  res.status(200).json(sessions);
	} catch (error) {
	  console.error('Error retrieving sessions:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

router.get('/session/:sessionId', async (req, res) => {
	try {
	  // Check if the sessionId is provided in the path parameter
	  const { sessionId } = req.params;
	  if (!sessionId) {
		return res.status(400).json({ error: 'Session ID is required' });
	  }
  
	  // Query the database to retrieve the session by its ID
	  const session = await Sessions.findById(sessionId);
  
	  // If the session is not found, return a 404 Not Found response
	  if (!session) {
		return res.status(400).json({ error: 'Session not found' });
	  }
  
	  // Return the retrieved session as a response
	  res.status(200).json(session);
	} catch (error) {
	  console.error('Error retrieving session:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

// DELETE /session/:sessionId
router.delete('/session/:sessionId', async (req, res) => {
	try {
	  // Check if the sessionId is provided in the path parameter
	  const { sessionId } = req.params;
	  if (!sessionId) {
		return res.status(400).json({ error: 'Session ID is required' });
	  }
  
	  // Attempt to find and delete the session by its ID
	  const deletedSession = await Sessions.findByIdAndDelete(sessionId);
  
	  // If the session is not found, return a 404 Not Found response
	  if (!deletedSession) {
		return res.status(404).json({ error: 'Session not found' });
	  }
  
	  // Return a 200 OK response with a success message
	  res.status(200).json({ message: 'Session deleted' });
	} catch (error) {
	  console.error('Error deleting session:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

// PUT /session/:sessionId/?title=newTitle
router.put('/session/:sessionId', async (req, res) => {
  try {
    // Check if the sessionId and title are provided in the path and query parameters
    const { sessionId } = req.params;
    const { title } = req.query;

    if (!sessionId || !title) {
      return res.status(400).json({ error: 'Session ID and title are required' });
    }

    // Attempt to find the session by its ID
    const session = await Sessions.findById(sessionId);

    // If the session is not found, return a 404 Not Found response
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Update the session's title
    session.title = title;

    // Save the updated session to the database
    const updatedSession = await session.save();

    // Return the updated session as a response
    res.status(200).json(updatedSession);
  } catch (error) {
    console.error('Error updating session title:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /session/:sessionId/messages
router.put('/session/:sessionId/messages', async (req, res) => {
  try {
    // Check if the sessionId and content are provided in the path parameters and request body
    const { sessionId } = req.params;
    const { content } = req.body;

    if (!sessionId || !content) {
      return res.status(400).json({ error: 'Content and sessionId are required' });
    }

    // Attempt to find the session by its ID
    const session = await Sessions.findById(sessionId);

    // If the session is not found, return a 404 Not Found response
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Add the new message content to the session's messages array
    session.messages.push(content);

    // Save the updated session to the database
    const updatedSession = await session.save();

    // Define an OpenAI chat response or a default response
    let chatResponse = 'Sorry, I don\'t understand.'; // Default response

    // You can implement OpenAI chat integration here to generate a response based on the new content.
    // For simplicity, I'm using a default response in this example.
    
    // ...

    // Add the chat response to the session's messages array
    updatedSession.messages.push(chatResponse);

    // Save the session again with the chat response
    const finalUpdatedSession = await updatedSession.save();

    // Return the updated session as a response
    res.status(200).json(finalUpdatedSession);
  } catch (error) {
    console.error('Error adding message to session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router