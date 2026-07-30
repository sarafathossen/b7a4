import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middlewares/globalErrorHandler'; 
import router from './routes/index'; 

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'GearUp Server Running Successfully... 🏋️',
  });
});

app.use('/api', router);

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API Route Not Found',
    errorDetails: {
      path: req.originalUrl,
      method: req.method,
      message: 'The requested route does not exist on this server.',
    },
  });
});

export default app;