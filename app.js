import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import { mongoURI } from './config/keys.js';
import AuthRoutes from './routes/auth.js';
import BookRoutes from './routes/book.js';
 import authMiddleware from './middleware/authentication.js';


class App {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 5000;

		this.initializeMiddlewares();
		this.connectToDatabase();
		this.initializeRoutes();
		this.startServer();
	}

	initializeMiddlewares() {
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
	}

    connectToDatabase() {
		mongoose.connect(mongoURI, {
			useNewUrlParser: true,
            useUnifiedTopology: true
        })
			.then(() => console.log("MongoDB connected"))
			.catch((err) => console.error(err));
	}

	
  

    initializeRoutes() {
        this.app.get('/', (req, res) => {
            res.send('welcome to the book store!');
        }
        );
           this.app.use('/api/auth', AuthRoutes);
           this.app.use('/api/books',authMiddleware, BookRoutes);
    }
    
	startServer() {
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}

new App();
