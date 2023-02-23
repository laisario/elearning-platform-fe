import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useUI } from "@contexts/ui-context";

import { scrollUpVariants } from "@utils/variants";
const HeroAction = dynamic(() => import("./action"), { ssr: false });
const HeroArea = () => {
    const { trans1, trans2 } = useUI();
    return (
        <div className="hero-area tw-py-16">
            <div className="tw-container tw-grid lg:tw-grid-cols-2 tw-gap-7.5">
                <div className="tw-relative tw-z-10">
                    <motion.div
                        className="tw-rounded-full tw-overflow-hidden"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={scrollUpVariants}
                    >
                        <img
                            src="/images/hero-image/medical.png"
                            alt="Hero"
                            width={570}
                            height={570}
                            className="tw-object-cover tw-w-full tw-h-full tw-mx-auto"
                        />
                    </motion.div>

                    <motion.div
                        className="tw-absolute -tw-z-1 tw-w-20 tw-h-20 tw-left-px tw-top-0 sm:tw-w-[100px] sm:tw-h-[100px] sm:tw-top-[124px] md:tw-w-auto md:tw-h-auto md:tw-left-px"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span data-depth="3">
                            <img
                                src="/images/shape-animation/about-shape-1.png"
                                alt=""
                            />
                        </span>
                    </motion.div>

                    <motion.div
                        className="tw-absolute -tw-z-1 tw-w-20 tw-h-20 tw-left-px tw-top-[70px] sm:tw-w-[100px] sm:tw-h-[100px] sm:tw-top-[262px] md:tw-w-auto md:tw-h-auto md:tw-left-px"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/about-shape-1.png"
                            alt=""
                        />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-top-[255px] tw-left-2 sm:tw-top-[355px] sm:-tw-left-2 tw-z-20"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span className="tw-block -tw-indent-[99999px] tw-border-[6px] tw-border-desert tw-rounded-full tw-w-[42px] tw-h-[42px] md:tw-w-[62px] md:tw-h-[62px] md:tw-border-8">
                            shape 3
                        </span>
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-w-[100px] tw-bottom-3.8 tw-right-5 sm:tw-w-[100px] sm:tw-bottom-[55px] sm:tw-right-[45px] md:tw-w-auto"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img src="/images/shape-animation/shape-1.png" alt="" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute tw-z-1 tw-w-15 tw-bottom-[140px] tw-right-2.5 sm:tw-bottom-[314px] sm:tw-right-7.5 md:tw-w-auto md:tw-right-[70px]"
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
                </div>
                <motion.div
                    className={`tw-text-center md:tw-text-left tw-self-center`}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    <h1 className="tw-text-3xl sm:tw-text-4xl lg:tw-text-5xl tw-leading-[1.17] tw-text-secondary">
                        Aprenda com uma equipe qualificada!
                    </h1>
                    <p className="tw-text-md sm:tw-text-[16px] lg:tw-text-lg tw-font-medium tw-leading-relaxed tw-text-secondary-light tw-mt-3">
                        Tenha acesso a aulas, materiais e etc disponibilizados
                        por uma equipe altamente top de médicos tipo a tia Ale e
                        bla bla bla bla bla bla bla
                    </p>

                    <HeroAction />
                </motion.div>
            </div>
        </div>
    );
};

export default HeroArea;
