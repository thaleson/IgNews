import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'
import style from './styles.module.scss'





export function SignInButton() {

    const { data: session } = useSession()

    return session ? (
        <button
            type="button"
            className={style.signInButton}
            onClick={() => signOut()}
        >
            <FaGithub color="#04d361" />

            {session.user.name}
            <FiX color="#737380" className={style.closeIcon} />
        </button>
    ) : (

        <button
            type="button"
            className={style.signInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417" />

            Sign in with Google

        </button>

    )
}