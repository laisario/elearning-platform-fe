import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Section from "@ui/section";
import { useUI } from "@contexts/ui-context";
import { scrollUpVariants } from "@utils/variants";

const CtaAction = dynamic(() => import("./action"), { ssr: false });

const CtaArea = () => {
    const { trans1, trans2 } = useUI();

    return (
        <Section className="cta-area">
            <motion.div
                className="tw-container tw-text-center tw-relative"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
                variants={scrollUpVariants}
            >
                <h3 className="tw-leading-none tw-mb-2.5 tw-text-secondary child:tw-text-primary child:tw-font-normal">
                    Comece agora mesmo e receba seu{" "}
                    <span>certificado MedCursos</span>
                </h3>
                <h2 className="tw-text-[34px] tw-mb-7.5 tw-text-secondary">
                    Você pode ser um médico de sucesso com a nossa ajuda!
                </h2>
                <CtaAction />
                <motion.div
                    className="tw-absolute tw-top-[-50px] tw-left-[50px] tw-z-20"
                    animate={{
                        x: trans2().x,
                        y: trans2().y,
                    }}
                >
                    <span className="tw-block -tw-indent-[99999px] tw-border-[7px] tw-border-desert-100 tw-rounded-full tw-w-[52px] tw-h-[52px]">
                        shape 1
                    </span>
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-1 tw-bottom-0 -tw-left-2.5 tw-w-15 md:tw-w-auto md:-tw-left-5"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <img
                        src="/images/shape-animation/cta-shape-01.png"
                        alt=""
                    />
                </motion.div>
                <motion.div
                    className="tw-absolute tw-z-1 tw-w-15 tw-top-5 -tw-right-5 md:tw-w-auto md:tw-top-2.5 md:tw-right-0"
                    animate={{
                        x: trans1().x,
                        y: trans1().y,
                    }}
                >
                    <img
                        src="/images/shape-animation/nwesletter-shape-2.png"
                        alt=""
                    />
                </motion.div>
            </motion.div>
        </Section>
    );
};

CtaArea.defaultProps = {
    bg: "tw-bg-gray-200",
};

export default CtaArea;
