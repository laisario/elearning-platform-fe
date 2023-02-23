/* eslint-disable react/jsx-no-useless-fragment */
import Router from "next/router";
import { useUser } from "@contexts/user-context";
import Button from "@ui/button";
import Alert from "@ui/alert";
import { ILesson } from "@utils/types";
import MarkdownRenderer from "@components/markdown-renderer";
import NavLink from "./nav-link";
import { useEffect } from "react";

type TProps = {
    data: {
        lesson: ILesson;
        course: number;
    };
};

const LessonDetails = ({ data: { lesson, course } }: TProps) => {
    const { user, watchLesson, update } = useUser();

    useEffect(() => {
        update();
    }, []);

    const isCompleted = user?.watchedLessons?.some(
        (watched) => watched === lesson.id
    );

    const onLessonComplete = async () => {
        await watchLesson(lesson);
        await update();
        if (lesson?.next) {
            void Router.push(`/courses/lessons/${course}/${lesson.next.id}`);
        }
    };

    return (
        <div className="tw-mx-auto tw-px-3.8 tw-py-[100px] tw-max-w-[930px]">
            <h2 className="tw-mb-[18px]">{lesson.name}</h2>
            {(lesson?.video || lesson?.video_id) && (
                <iframe
                    src={lesson?.video || lesson?.video_id}
                    title={lesson.name}
                    className="tw-mb-10"
                />
            )}
            <MarkdownRenderer content={lesson.description} />

            {isCompleted ? (
                <Alert className="tw-mt-8 tw-text-center" color="secondary">
                    Finalizado <i className="fa fa-check" />
                </Alert>
            ) : (
                <Button className="tw-mt-8" onClick={onLessonComplete}>
                    Finalizar
                </Button>
            )}

            <div className="tw-mt-7 tw-flex tw-justify-between tw-items-center">
                {!!lesson.prev && (
                    <NavLink
                        title={lesson.prev.name}
                        path={`/courses/lessons/${course}/${lesson.prev.id}`}
                        variant="prev"
                    />
                )}
                {!!lesson.next && (
                    <NavLink
                        title={lesson.next.name}
                        path={`/courses/lessons/${course}/${lesson.next.id}`}
                        variant="next"
                    />
                )}
            </div>
        </div>
    );
};

export default LessonDetails;
