import { prisma } from '../../lib/prisma';
import Stripe from 'stripe';
import AppError from '../../errors/AppError';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'fake_key', {
  apiVersion: '2025-01-27.acacia' as any,
});

const createPaymentIntent = async (rentalOrderId: string) => {
  const order = await prisma.rentalOrder.findUnique({ where: { id: rentalOrderId } });
  if (!order) throw new AppError(404, 'Rental order not found!');

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.totalPrice * 100), // Cents-এ কনভার্ট করা হয়েছে
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return { clientSecret: paymentIntent.client_secret };
};

const confirmPayment = async (payload: { rentalOrderId: string; transactionId: string }) => {
  return await prisma.$transaction(async (tx) => {
    const order = await tx.rentalOrder.update({
      where: { id: payload.rentalOrderId },
      data: { status: 'PAID' },
    });

    await tx.payment.create({
      data: {
        rentalOrderId: payload.rentalOrderId,
        amount: order.totalPrice,
        transactionId: payload.transactionId,
        method: 'Stripe',
        status: 'COMPLETED',
        paidAt: new Date(),
      },
    });

    return order;
  });
};

export const PaymentService = { createPaymentIntent, confirmPayment };