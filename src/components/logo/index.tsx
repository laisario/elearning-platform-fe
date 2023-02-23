import Link from "next/link";
import clsx from "clsx";

type TProps = {
    className?: string;
};

const Logo = ({ className }: TProps) => {
    return (
        <Link href="/">
            <a className={clsx("tw-inline-block", className)}>
                <img src="/images/logo/dark-logo.png" alt="Logo" />
            </a>
        </Link>
    );
};

export default Logo;
