import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import CourseCard from "@components/course-card";
import { scrollUpVariants } from "@utils/variants";
import { ICourse, TSection } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedCourseCard = motion(CourseCard);

type TProps = TSection & {
    data: {
        courses: ICourse[];
    };
    title?: string;
    subtitle?: string;
};

const CourseArea = ({ data: { courses }, title, subtitle }: TProps) => {
    return (
        <Section className="course-area">
            <div className="tw-container">
                <AnimatedSectionTitle
                    title={title || "Cursos recomendados para você"}
                    subtitle={
                        subtitle || "Quer se tornar um médico de excelência?"
                    }
                    className="tw-mb-7.5 md:tw-mb-15"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                />
                <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-[30px]">
                    {courses?.map((course) => (
                        <AnimatedCourseCard
                            key={course.id}
                            summary={course.summary}
                            name={course.name}
                            path={`/courses/${course.category?.name}/${course.id}`}
                            category={course.category}
                            created_at={course.created_at}
                            image={
                                course.image ||
                                "/images/courses/370/course-1.jpg"
                            }
                            price={course.price}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
};

CourseArea.defaultProps = {
    space: "top-bottom",
};

export default CourseArea;
