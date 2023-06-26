import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes';

const router: Express = express();

router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//set policies
router.use((req, res, next) => {
	//CORS policy
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
		return res.status(200).json({});
	}
	next();
});

router.use('/', routes);

//route not handled by previously defined endpoints
router.use((req, res, next) => {
	const error = new Error('not found');
	return res.status(404).json({
		message: error.message
	});
});

const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));