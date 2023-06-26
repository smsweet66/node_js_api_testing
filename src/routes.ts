import express from 'express';
import handler from './handlers';
const router = express.Router();

router.get('/:a/:b', handler.addHandler);

export = router;