import clsx from "clsx";
import Badge from "@ui/badge";
import Anchor from "@ui/anchor";
import { ISection } from "@utils/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import ptLocale from "dayjs/locale/pt-br";
import { useUser } from "@contexts/user-context";

dayjs.extend(duration);
dayjs.locale(ptLocale);
dayjs.extend(relativeTime);

type TProps = {
    sections: ISection[];
    course: number;
};

const CurriculumPanel = ({ sections, course }: TProps) => {
    const getDuration = (duration: string) => {
        const [h, m, s] = duration.split(":");
        const hours = Number(h);
        const minutes = Number(m);
        const seconds = Number(s);
        return dayjs.duration({ hours, minutes, seconds }).humanize();
    };
    const { user } = useUser();
    const enrolledCourse = user?.purchasedCourses?.find(
        (purchased) => purchased.id === course
    );

    return (
        <div className="curriculum-sections">
            {sections.map(({ id, name, summary, lessons }) => (
                <div
                    key={id}
                    className="tw-border tw-border-alto tw-rounded tw-mt-[50px] first:tw-mt-0"
                >
                    <div className="tw-py-5 tw-px-3.8 md:tw-py-[22px] md:tw-px-12">
                        <h5 className="tw-text-xl tw-mb-0">{name}</h5>
                        {summary && (
                            <p className="tw-text-md tw-mb-0 tw-mt-[5px] tw-italic">
                                {summary}
                            </p>
                        )}
                    </div>
                    {lessons.length > 0 && (
                        <ul className="section-content">
                            {lessons.map((item) => {
                                return (
                                    <li
                                        key={item.id}
                                        className="tw-text-md even:tw-bg-light-100 odd:tw-bg-white even:last:tw-rounded-b"
                                    >
                                        <Anchor
                                            path={`/courses/lessons/${course}/${item.id}`}
                                            className={clsx(
                                                "tw-px-3.8 md:tw-pl-12 md:tw-pr-7.5 tw-min-h-[56px] tw-flex tw-flex-wrap tw-items-center",
                                                !enrolledCourse &&
                                                    "tw-pointer-events-none"
                                            )}
                                        >
                                            <span className="tw-grow tw-py-2.5">
                                                <i
                                                    className={clsx(
                                                        "far tw-w-5 tw-text-md",
                                                        "fa-file-alt"
                                                    )}
                                                />
                                                {item.name}
                                            </span>
                                            <div className="tw-text-right tw-flex tw-items-center tw-py-2.5">
                                                <Badge className="tw-ml-2.5">
                                                    {getDuration(item.duration)}
                                                </Badge>
                                                {(item?.video ||
                                                    item.video_id) && (
                                                    <span className="tw-ml-2.5 tw-font-medium tw-px-3.8">
                                                        <i className="far fa-video" />
                                                    </span>
                                                )}
                                                <span className="tw-ml-2.5 tw-font-medium tw-px-3.8">
                                                    <i className="fas fa-lock-alt" />
                                                </span>
                                            </div>
                                        </Anchor>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CurriculumPanel;
