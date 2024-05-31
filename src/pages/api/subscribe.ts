import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from 'faunadb'
import { getSession } from "next-auth/react";
import { stripe } from "../../services/stripe";
import { fauna } from "../../services/fauna"

type User = {
    ref: {
        id: string;
    }
    data:{
        stripe_customer_id: string;
       
    };
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const session = await getSession({ req });

        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index("user_by_email"),
                    q.Casefold(session.user.email)
                )
            )
        )
       
        if (!session || !session.user) {
            return res.status(401).json({ error: "User session not available" });
        }


        let customerid=user.data.stripe_customer_id

        if (!customerid){

            const stripeCustomer = await stripe.customers.create({
                email: session.user.email,
            });
            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    {
                        data: {
                            stripe_customer_id: stripeCustomer.id,
                        }
                    }
                )
            )
            customerid =stripeCustomer.id
 
            
        }

     
            const stripeCheckoutSession = await stripe.checkout.sessions.create({
                customer: customerid,
                payment_method_types: ["card"],
                billing_address_collection: "required",
                line_items: [
                    {
                        price: "price_1PLCbJJa0wr5RduJRdsdssi7",
                        quantity: 1,
                    },
                ],
                mode: "subscription",
                allow_promotion_codes: true,
                success_url: process.env.STRIPE_CANCEL_URL,
                cancel_url: process.env.STRIPE_SUCESS_UR,
            });

            console.log("Stripe Checkout Session Data:", stripeCheckoutSession);

            res.status(200).json({ sessionId: stripeCheckoutSession.id });
         
        }
    
};
