import Router from 'express';

import showMe from './show.mjs';
import login from './login.mjs';
import register from './register.mjs';
import {updateAsAdmin, updateUser} from './update.mjs';
import usersList from './list.mjs';
import {activateUser, deactivateUser} from './beauty.mjs';
import removeUser from './remove.mjs';

import {authLocal, isAuthJwt, isActive} from '../../middleware/auth.mjs';
import {checkIfAdmin, mustBeAdmin} from '../../middleware/admin.mjs';
import isValidId from '../../middleware/id.mjs';

const router = Router();

router.use(checkIfAdmin);

router.post('/register', register);
router.post('/login', authLocal, login);
router.get('/me', isAuthJwt, showMe);
router.put('/:id', isValidId, updateAsAdmin, isAuthJwt, isActive, updateUser);

router.use(mustBeAdmin);
router.get('/', usersList);
router.patch('/up/:id', isValidId, activateUser);
router.patch('/down/:id', isValidId, deactivateUser);
router.delete('/:id', isValidId, removeUser);

export default router;