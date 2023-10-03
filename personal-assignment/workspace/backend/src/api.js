const express = require('express')

const Sessions = require('./models/sessions')
const openAIChat = require('./utils/openai')

const router = express.Router()

router.get("/test", (req, res) => {
  res.send({ msg: "you are amazing!" })
});

//create new session
router.post('/users/:userId/sessions', async (req, res) => {
	const { userId } = req.params;
	if (!userId) {
	  return res.status(400).json({ error: 'User ID is required' });
	}
	try {  
	  // Create a new session
	  const newSession = new Sessions({
		user:userId,
		title:`${new Date()}`,
		createdAt: new Date(),
		messages:[],
	  });
  
	  // Save the session to the database
	  const savedSession = await newSession.save();
	  res.json(savedSession);
	} catch (error) {
	  console.error('Error creating session:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

// find by userId
router.get('/users/:userId/sessions', async (req, res) => {
	const { userId } = req.params;
	  if (!userId) {
		return res.status(400).json({ error: 'User ID is required' });
	  }
	try {
	  const sessions = await Sessions.find({ user: userId });
	  res.status(200).json(sessions);
	} catch (error) {
	  console.error('Error retrieving sessions:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

//find by session id
router.get('/session/:sessionId', async (req, res) => {
	const { sessionId } = req.params;
	if (!sessionId) {
		return res.status(400).json({ error: 'Session ID is required' });
	}  
	try {
		console.log(sessionId)
	  const session = await Sessions.find({ _id:sessionId });
	  res.status(200).json(session);
	} catch (error) {
		errorType = error.path
		if (errorType === "_id") {
			return res.status(404).json({ error: 'Session not found' });
		}
		else {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
  });

// DELETE session by sessionID
router.delete('/session/:sessionId', async (req, res) => {
	const { sessionId } = req.params;
	if (!sessionId) {
	  return res.status(400).json({ error: 'Session ID is required' });
	}
	try {
		const session = await Sessions.deleteOne({ _id:sessionId });
	  res.status(200).json({ message: 'Session deleted' });
	} catch (error) {
		errorType = error.path
		if (errorType === "_id") {
			return res.status(404).json({ error: 'Session not found' });
		  }
	  console.error('Error deleting session:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

// change session title by sessionId
router.put('/session/:sessionId', async (req, res) => {
	const { sessionId } = req.params;
    const { title } = req.query;
    if (!sessionId || !title) {
      return res.status(400).json({ error: 'Session ID and title are required' });
    }
  try {
    const session = await Sessions.find({ _id:sessionId });
    session[0].title = title;
	// console.log(title,session)
    const updatedSession = await session[0].save();
    res.status(200).json(updatedSession);
  } catch (error) {
	errorType = error.path
	if (errorType === "_id") {
		return res.status(404).json({ error: 'Session not found' });
	  }
  console.error('Error deleting session:', error);
  res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /session/:sessionId/messages
router.put('/session/:sessionId/messages', async (req, res) => {
	const { sessionId } = req.params;
    const { content } = req.body;

    if (!sessionId || !content) {
      return res.status(400).json({ error: 'Content and sessionId are required' });
    }

  try {
    const session = await Sessions.find({ _id:sessionId });
    session[0].messages.push(content);

    // Save the updated session to the database
    const updatedSession = await session[0].save();

    // Define an OpenAI chat response or a default response
    let chatResponse = 'Sorry, I don\'t understand.'; // Default response
    // Generate a chat response using OpenAI
	// console.log(updatedSession.messages)

    const openAIResponse = await openAIChat(updatedSession.messages);
    // Add the chat response to the session's messages array
    updatedSession.messages.push(openAIResponse.message.content);
	console.log(updatedSession)

    // Save the session again with the chat response
    const finalUpdatedSession = await updatedSession.save();

    // Return the updated session as a response
    res.status(200).json(finalUpdatedSession);
  } catch (error) {
	errorType = error.path
	if (errorType === "_id") {
		return res.status(404).json({ error: 'Session not found' });
	  }
	// console.error('Error deleting session:', error);
	res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router