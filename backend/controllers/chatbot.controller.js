import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

// Create a new session client
const sessionClient = new dialogflow.SessionsClient();

export const detectIntent = async (req, res) => {
    try {
        const { message, sessionId = uuidv4() } = req.body;
        const projectId = process.env.DIALOGFLOW_PROJECT_ID;

        if (!projectId) {
            return res.status(500).json({ success: false, message: 'Dialogflow Project ID is not configured.' });
        }

        // The path to identify the agent that owns the created intent.
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: message,
                    // The language used by the client (en-US)
                    languageCode: 'en-US',
                },
            },
        };

        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;

        return res.status(200).json({
            success: true,
            reply: result.fulfillmentText,
            sessionId: sessionId
        });
    } catch (error) {
        console.error('Error in Dialogflow setup:', error);
        return res.status(500).json({ success: false, message: 'Failed to process chat message', error: error.message });
    }
};

