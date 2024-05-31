import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import Stripe from "stripe";
import stripe from '../../services/stripe';
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
        );
    }
    return Buffer.concat(chunks);
}

const relevantEvents = new Set([
    'checkout.session.completed',
    'customer.subscription.updated',
    'customer.subscription.deleted',
]);

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const secret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!secret) {
            console.error('Stripe webhook secret not configured');
            return res.status(500).send('Webhook secret not configured');
        }

        const sig = req.headers['stripe-signature'];

        if (!sig) {
            console.error('Missing Stripe signature');
            return res.status(400).send('Missing Stripe signature');
        }

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, secret);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.error(`⚠️  Webhook signature verification failed: ${errorMessage}`);
            return res.status(400).send(`Webhook error: ${errorMessage}`);
        }

        const { type } = event;

        if (relevantEvents.has(type)) {
            try {
                switch (type) { 
                    case 'customer.subscription.updated':
                    case 'customer.subscription.deleted':
                        const subscription = event.data.object as Stripe.Subscription;
                        await saveSubscription(
                            subscription.id,
                            subscription.customer.toString(),
                            false
                        );
                        break;

                    case 'checkout.session.completed':
                        const checkoutSession = event.data.object as Stripe.Checkout.Session;
                        if (checkoutSession.subscription) {
                            await saveSubscription(
                                checkoutSession.subscription.toString(),
                                checkoutSession.customer.toString(),
                                true
                            );
                        } else {
                            console.error('Missing subscription in checkout session');
                            return res.status(400).send('Missing subscription in checkout session');
                        }
                        break;

                    default:
                        throw new Error('Unhandled event.');
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                console.error(`⚠️  Webhook handler failure: ${errorMessage}`);
                return res.status(400).json({ error: `Webhook handler failure: ${errorMessage}` });
            }
        }

        res.status(200).json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method not allowed');
    }
}
