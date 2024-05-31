import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";
import { ActiveLink } from "../ActiveLink";

export function Header() {


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/ig.news.svg" alt="Ig.News" />
                <nav>
                    <ActiveLink activerClassName={styles.active} href="/" legacyBehavior>
                        <a className={styles.active}>Home</a>
                    </ActiveLink>
                    <ActiveLink activerClassName={styles.active} href="/posts" legacyBehavior>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}
