import { Router } from "express";
const router = Router();

import main from './src/controllers/main'; 

router.get('/index', main.index);
router.post('/main', main.main);

module.exports = router;