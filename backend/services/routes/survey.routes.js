import { Router } from 'express';
import Survey from '../models/survey.model.js';
import Den from '../models/den.model.js';

export const surveyRoute = Router();

// Get all surveys of a specified den
surveyRoute.get('/', async (req, res) => {
    const { denId } = req.query;

    try {
        const surveys = await Survey.find({ den: denId, closed: false })
            .populate('gameOptions');
        res.json(surveys);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Create a new survey and notify members
surveyRoute.post('/create', async (req, res) => {
    try {
        const { denId, gameOptions, dateOptions, creatorId } = req.body;

        const den = await Den.findById(denId);
        if (!den) return res.status(404).send('Den not found');

        const survey = new Survey({
            den: denId,
            creator: creatorId,
            gameOptions,
            dateOptions
        });

        await survey.save();

        // System to notify den members that a survey has been created
        den.members.forEach(async (memberId) => {
            if (memberId.toString() !== creatorId.toString()) {
                // Add a real notifying system
                console.log(`Notification sent to member ${memberId}`);
            }
        });

        res.status(201).json(survey);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get survey with specified id
surveyRoute.get('/:id', async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id)
            .populate('gameOptions');
        if (!survey) return res.status(404).send('Survey not found');
        res.json(survey);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Send survey answer
surveyRoute.post('/respond', async (req, res) => {
    try {
        const { surveyId, selectedGame, selectedDateOption, responderId: meepleId } = req.body;

        const survey = await Survey.findById(surveyId);
        if (!survey) return res.status(404).send('Survey not found');

        // Controls if logged meeple already answered to the survey
        const existingResponseIndex = survey.responses.findIndex(response => response.meeple.toString() === meepleId);
        
        if (existingResponseIndex !== -1) {
            // Updates existing answer
            survey.responses[existingResponseIndex].selectedGame = selectedGame;
            survey.responses[existingResponseIndex].selectedDateOption = selectedDateOption;
        } else {
            // Adds new answer
            survey.responses.push({ meeple: meepleId, selectedGame, selectedDateOption });
        }

        await survey.save();

        // Verifies if all den members have responded
        const den = await Den.findById(survey.den);
        if (survey.responses.length === den.members.length) { //! verificare come viene conteggiato il creator
            survey.closed = true;
            await survey.save();
            // Plans the game
            console.log('All members have responded. Planning the game...');
        }

        res.status(200).json(survey);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

surveyRoute.delete('/:surveyId', async (req, res, next) => {
    try {
        const { surveyId } = req.params;
        const survey = await Survey.findByIdAndDelete(surveyId);

        if (!survey) {
            return res.status(404).json({ message: 'Survey not found' });
        }

        res.status(200).json({ message: 'Survey deleted successfully' });
    } catch (error) {
        next(error);
    }
});