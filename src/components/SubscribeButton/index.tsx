import { useSession, signIn } from 'next-auth/react';
import styles from './styles.module.scss';
import { api } from '../../services/api';
import { getStripejs } from '../../services/stripe-js';
import { useRouter } from 'next/router';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn('github'); // Redireciona para login se o usuário não estiver logado
      return;
    }

    //@ts-ignore
    if (session.activeSubscription) {
      router.push('/posts'); // Redireciona para os posts se o usuário tiver uma assinatura ativa
      return;
    }

    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;

      if (!sessionId) {
        throw new Error('Session ID not available in the response');
      }

      const stripe = await getStripejs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  );
}
