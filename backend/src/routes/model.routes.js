import {Router} from 'express';
import { 
    passage,
    questions,
    getPassageAndsaveAnswers,
    getRecommendation } from '../controllers/model.controller.js';


import {verifyJWT} from '../middlewares/auth.middleware.js';
const router = Router();






router.route('/passage').post( verifyJWT,passage);
router.route('/questions').post(verifyJWT, questions);
router.route('/passage/:id').post(verifyJWT, getPassageAndsaveAnswers);
router.route('/recommendation').post(verifyJWT,getRecommendation)

export default router;