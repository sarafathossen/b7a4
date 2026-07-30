import { prisma } from '../../lib/prisma.js';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
});

const createPaymentIntentIntoDB = async (payload: {
  rentalOrderId: string;
  paymentMethod: string;
  customerId?: string;
}) => {
  const { rentalOrderId, paymentMethod } = payload;

  
  const rentalOrder = await prisma.rentalOrder.findUnique({
    where: { id: rentalOrderId },
  });

  if (!rentalOrder) {
    throw new Error('Rental order not found!');
  }

  
  if (paymentMethod === 'Stripe') {
    
    const amountInCents = Math.round(Number(rentalOrder.totalPrice) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        rentalOrderId: rentalOrder.id,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      totalPrice: rentalOrder.totalPrice,
      currency: 'usd',
      paymentIntentId: paymentIntent.id,
    };
  }

  throw new Error('Unsupported payment method!');
};

export const PaymentService = {
  createPaymentIntentIntoDB,
};