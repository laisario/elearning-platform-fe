import { motion } from "framer-motion";
import Section from "@ui/section";
import CourseCard from "@components/course-card/course-03";
import Button from "@ui/button";
import { scrollUpVariants } from "@utils/variants";
import CourseInfoItem from "@components/widgets/course-info/item";
import { useUser } from "@contexts/user-context";
import { useCart } from "@contexts/cart-context";

const AnimatedCourseCard = motion(CourseCard);

const CourseArea = () => {
    const { cart, clearCart } = useCart();
    const { purchaseCourse } = useUser();
    const total = cart?.reduce((acc, course) => acc + Number(course.price), 0);
    const discountPercentage = 0;
    const subtotal = (total || 0) * (1 + discountPercentage);
    const discount = discountPercentage * subtotal;
    return (
        <Section className="course-area">
            <div className="tw-container">
                <div className="tw-flex tw-flex-row">
                    <div className="tw-grid lg:tw-grid-cols-1 tw-gap-7.5 tw-w-[75%] tw-h-min">
                        {!cart?.length && (
                            <div>
                                <h1>Que pena!</h1>
                                <p>Ainda não há itens em seu carrinho.</p>
                            </div>
                        )}
                        {cart?.map((course) => (
                            <AnimatedCourseCard
                                key={course.id}
                                id={course.id}
                                path={`/courses/${course.category?.name}/${course.id}`}
                                name={course.name}
                                image={course.image}
                                price={course.price}
                                lessons_count={course.lessons_count}
                                students_count={course.students_count}
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.4 }}
                                variants={scrollUpVariants}
                            />
                        ))}
                    </div>
                    <div className="tw-bg-white tw-ml-15 tw-w-[25%] tw-h-fit tw-p-5 tw-shadow-2sm tw-shadow-heading/10 tw-rounded lg:tw-max-w-[340px]">
                        <h3>Carrinho</h3>
                        <p>Voce tem {cart?.length} cursos no seu carrinho</p>
                        <div className="tw-mb-4">
                            <CourseInfoItem
                                icon="far fa-money-bill"
                                label="Subtotal"
                                value={`R$ ${subtotal.toFixed(2)}`}
                                variant="subtotal"
                            />
                            <CourseInfoItem
                                icon="far fa-badge-dollar"
                                label="Descontos"
                                value={`R$ ${discount.toFixed(2)}`}
                                variant="discounts"
                            />
                            <CourseInfoItem
                                icon="far fa-money-bill-wave"
                                label="Total"
                                value={`R$ ${total?.toFixed(2)}`}
                                variant="total"
                            />
                        </div>
                        {!!cart?.length && (
                            <Button
                                fullwidth
                                className="tw-mb-4"
                                onClick={async () => {
                                    await Promise.all(cart.map(purchaseCourse));
                                    clearCart();
                                }}
                            >
                                Continuar
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
};

CourseArea.defaultProps = {
    bg: "tw-bg-white-catskill",
};

export default CourseArea;
