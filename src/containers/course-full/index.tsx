import { motion } from "framer-motion";
import Section from "@ui/section";
import CourseCard from "@components/course-card";
import { ICourse } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedCourseCard = motion(CourseCard);

type TProps = {
    data: {
        courses: ICourse[];
    };
};

const CourseArea = ({ data: { courses } }: TProps) => {
    return (
        <Section className="course-area" space="bottom">
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-items-center tw-mb-5">
                    <p className="tw-mb-2.5">
                        Encontramos {courses?.length} cursos disponiveis para
                        voce
                    </p>
                </div>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-[30px]">
                    {courses?.map((course) => (
                        <AnimatedCourseCard
                            key={course.id}
                            summary={course.summary}
                            name={course.name}
                            path={`/courses/${course.category?.name}/${course.id}`}
                            image={
                                course.image ||
                                "/images/courses/370/course-1.jpg"
                            }
                            price={course.price}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={scrollUpVariants}
                            category={course.category}
                            created_at={course.created_at}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default CourseArea;
