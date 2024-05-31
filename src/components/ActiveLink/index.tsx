import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement,cloneElement } from "react";


interface ActiveProps extends LinkProps {

    children: ReactElement;
    activerClassName: string;
}

export function ActiveLink({ children, activerClassName, ...rest }: ActiveProps) {
    const { asPath } = useRouter()
    const className = asPath == rest.href ? activerClassName : '';
    return (
        <Link {...rest}>
            { cloneElement ( children,{
                className,
            })}
        </Link>
    );
}