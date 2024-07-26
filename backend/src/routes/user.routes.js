import {Router} from 'express';
const router = Router();

import {
    loginUser,
    registerUser,
    getCurrentUser
} from "../controllers/user.controller.js";

import {upload} from '../middlewares/multer.middleware.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';

router.route('/register').post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1,
        },
        ]),
    registerUser
);

router.route('/login').post(loginUser);
router.route('/current-user').post(verifyJWT,getCurrentUser);

export default router;