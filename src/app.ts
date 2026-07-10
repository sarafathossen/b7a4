import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middlewares/globalErrorHandler.js'; // .js যুক্ত করা হয়েছে
import router from './routes/index.js'; // .js যুক্ত করা হয়েছে (অথবা শুধু ./routes.js তোমার ফাইল স্ট্রাকচার অনুযায়ী)

const app: Application = express();

// মিডলওয়্যারসমূহ
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// মেইন এপিআই রাউটস
app.use('/api', router);

// রুট রাউট
app.get('/', (req: Request, res: Response) => {
  res.send('GearUp Server Running... 🏋️');
});

// গ্লোবাল এরর হ্যান্ডলার মিডলওয়্যার
app.use(globalErrorHandler);

// ৪MD৪ (Not Found) রাউট হ্যান্ডলিং — অ্যাসাইনমেন্টের রিকোয়ারমেন্ট অনুযায়ী কনসিস্টেন্ট রেসপন্স
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API Route Not Found',
    errorDetails: {
      path: req.originalUrl,
      method: req.method,
      message: "The requested route does not exist on this server."
    },
  });
});

export default app;