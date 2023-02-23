import { TabContainer, TabNav, TabPane, TabList, TabContent } from "@ui/tab";
import { ICourse } from "@utils/types";
import CourseInfo from "@widgets/course-info";
import OverviewPanel from "./overview-panel";
import CurriculamPanel from "./curriculam-panel";
import ReviewPanel from "./review-panel";

type TProps = {
    data: {
        course: ICourse;
    };
};

const CourseDetails = ({ data: { course } }: TProps) => {
    return (
        <section className="course-details">
            <div className="tw-container tw-grid lg:tw-grid-cols-3 tw-gap-12">
                <div className="lg:tw-col-[1/3]">
                    <TabContainer variant="underline">
                        <TabList>
                            <TabNav>Visao Geral</TabNav>
                            <TabNav>Grade Curricular</TabNav>
                            <TabNav>Avaliacoes</TabNav>
                        </TabList>
                        <TabContent className="tw-mt-10 lg:tw-mt-[50px]">
                            <TabPane>
                                {course?.description && (
                                    <OverviewPanel
                                        introVideo={course.intro_video}
                                        introVideoId={course.intro_video_id}
                                        summary={course.summary}
                                        description={course?.description}
                                    />
                                )}
                            </TabPane>
                            <TabPane>
                                {!!course?.sections?.length && (
                                    <CurriculamPanel
                                        sections={course?.sections}
                                    />
                                )}
                            </TabPane>
                            <TabPane>
                                {course?.reviews && (
                                    <ReviewPanel reviews={course.reviews} />
                                )}
                            </TabPane>
                        </TabContent>
                    </TabContainer>
                </div>
                <div className="lg:tw-col-[3/-1]">
                    <div className="tw-sticky tw-top-24">
                        <CourseInfo course={course} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;
