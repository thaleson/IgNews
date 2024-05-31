import NextAuth, { Session, User } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  jwt: {
    secret: process.env.SIGNING_KEY,
  },
  callbacks: {
    async session({ session }: { session: Session }) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        );

        return {
          ...session,
          activeSubscription: userActiveSubscription
        };
      } catch (error) {
        console.error('Error retrieving active subscription:', error);
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },

    async signIn({ user, account, profile }: { user: User; account: any; profile: any }) {
      const { email } = user;

      try {
        const userExists = await fauna.query(
          q.Exists(
            q.Match(
              q.Index('user_by_email'),
              q.Casefold(email)
            )
          )
        );

        if (!userExists) {
          await fauna.query(
            q.Create(
              q.Collection('users'),
              { data: { email } }
            )
          );
        }

        return true;
      } catch (error) {
        console.error('Error signing in:', error);
        return false;
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: null,
  },
});
