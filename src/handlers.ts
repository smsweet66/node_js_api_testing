import { Request, Response, NextFunction } from 'express';

async function addHandler(req: Request, res: Response) {
	let a = +req.params.a;
	let b = +req.params.b;

	let result = a + b;

	return res.status(200).json(result);
}

export default {addHandler};