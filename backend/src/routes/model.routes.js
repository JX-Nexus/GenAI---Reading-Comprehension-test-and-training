import {Router} from 'express';
const router = Router();


import { passageAndQuestions } from '../controllers/model.controller.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';


router.route('/passage').post(verifyJWT,passageAndQuestions);

export default router;