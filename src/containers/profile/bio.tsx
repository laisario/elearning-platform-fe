import { motion } from "framer-motion";
import Section from "@ui/section";
import CourseCard from "@components/course-card";
import CourseInfoItem from "@components/widgets/course-info/item";
import Button from "@ui/button";
import { useUser } from "@contexts/user-context";
import { scrollUpVariants } from "@utils/variants";
import { useEffect } from "react";
const AnimatedCourseCard = motion(CourseCard);

const ProfileBio = () => {
    const { user, update } = useUser();

    if (!user?.token) return null;

    useEffect(() => {
        update();
    }, []);

    return (
        <Section className="profile-area">
            <div className="tw-container ">
                <div className="tw-flex tw-flex-col md:tw-flex-row">
                    <div className="md:tw-w-3/4">
                        <h2>Sua área de estudos</h2>
                        <div className="tw-flex tw-flex-row tw-gap-x-3 tw-overflow-scroll">
                            <Button active>Seus cursos</Button>
                            <Button>Seus simulados</Button>
                            <Button>Suas perguntas</Button>
                            <Button>Seus certificados</Button>
                        </div>
                        <div className="tw-grid lg:tw-grid-cols-1 tw-gap-7.5 tw-h-min tw-mt-5">
                            {user.purchasedCourses?.map((course) => (
                                <AnimatedCourseCard
                                    className="tw-max-w-xs"
                                    key={course.id}
                                    category={course.category}
                                    path={`/courses/${course.category?.name}/${course.id}`}
                                    name={course.name}
                                    image={course.image}
                                    summary={course.summary}
                                    created_at={course.created_at}
                                    price={course.price}
                                    noShowPrice
                                    initial="offscreen"
                                    whileInView="onscreen"
                                    viewport={{ once: true, amount: 0.4 }}
                                    variants={scrollUpVariants}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="md:tw-w-1/4 tw-shadow-2sm tw-shadow-heading/10 tw-rounded tw-p-5 tw-h-fit tw-mt-14 md:tw-mt-0">
                        <img
                            className="tw-rounded-full tw-mx-auto tw-mb-4"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
                            width={100}
                            height={100}
                        />
                        <h3 className="tw-text-center">
                            {user?.firstName} {user?.lastName}
                        </h3>
                        <p className="tw-text-center">
                            Seus números na plataforma
                        </p>
                        <CourseInfoItem
                            label="Aulas concluídas"
                            value={user?.watchedLessons?.length || 0}
                            variant="subtotal"
                        />
                        <CourseInfoItem
                            label="Questões respondidas"
                            value={0}
                            variant="discounts"
                        />
                        <CourseInfoItem
                            label="Perguntas feitas"
                            value={0}
                            variant="subtotal"
                        />
                        <CourseInfoItem
                            label="Certificados obtidos"
                            value={0}
                            variant="total"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default ProfileBio;
