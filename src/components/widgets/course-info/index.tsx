/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from "react";
import dayjs from "dayjs";
import Router from "next/router";
import Button from "@ui/button";
import SocialShare from "@components/social-share/layout-01";
import { useUser } from "@contexts/user-context";
import { useCart } from "@contexts/cart-context";
import { useMount } from "@hooks";
import CourseInfoItem from "./item";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import ptLocale from "dayjs/locale/pt-br";
import { ICourse } from "@utils/types";

dayjs.extend(duration);
dayjs.locale(ptLocale);
dayjs.extend(relativeTime);

type TProps = {
    course: ICourse;
};

const CourseInfo = ({ course }: TProps) => {
    const mounted = useMount();
    const { addToCart, cart } = useCart();
    const { user } = useUser();
    const enrolledCourse = user?.purchasedCourses?.find(
        (purchased) => purchased.id === course.id
    );
    const addedToCart = cart?.some((cartCourse) => cartCourse.id === course.id);

    const continueHandler = () => {
        void Router.push(
            `/courses/lessons/${course.id}/${course.sections[0].lessons[0].id}`
        );
    };

    if (!mounted) return null;

    const getDuration = () => {
        const [h, m, s] = course.duration.split(":");
        const hours = Number(h);
        const minutes = Number(m);
        const seconds = Number(s);
        return dayjs.duration({ hours, minutes, seconds }).humanize();
    };

    const getAvailability = () => {
        const [d] = course.availability.split(" ");
        const days = Number(d);
        return dayjs().add(days, "day").format("DD/MM/YYYY");
    };

    return (
        <>
            <div className="course-info-widget tw-pt-7.5 tw-px-7.5 tw-pb-[33px] tw-bg-white tw-shadow-2sm tw-shadow-heading/10 tw-rounded lg:tw-max-w-[340px]">
                <div className="course-price tw-flex tw-items-center tw-justify-between tw-mb-[7px]">
                    <h6 className="tw-mb-0">
                        <i className="far fa-money-bill-wave tw-text-body tw-min-w-[28px] tw-text-center" />{" "}
                        Preço
                    </h6>
                    <span className="tw-text-right">
                        <span className="tw-text-2xl tw-text-primary tw-font-extrabold">
                            R$
                            {course.price.toString().split(".")[0]}
                            <span className="tw-text-lg">
                                .{course.price.toString().split(".")[1]}
                            </span>
                        </span>
                    </span>
                </div>
                <div className="course-meta tw-mb-10">
                    <CourseInfoItem
                        icon="far fa-clock"
                        label="Duração"
                        value={getDuration()}
                    />
                    <CourseInfoItem
                        icon="far fa-file-alt"
                        label="Aulas"
                        value={course.lessons_count}
                    />
                    <CourseInfoItem
                        icon="far fa-user-alt"
                        label="Participantes"
                        value={`${course.students_count} Alunos`}
                    />
                    <CourseInfoItem
                        icon="far fa-calendar"
                        label="Prazo"
                        value={getAvailability()}
                    />
                </div>

                {enrolledCourse ? (
                    <Button
                        fullwidth
                        className="tw-mb-4"
                        onClick={continueHandler}
                    >
                        Acessar curso
                    </Button>
                ) : (
                    <Button
                        disabled={addedToCart}
                        fullwidth
                        className="tw-mb-4"
                        onClick={() => addToCart(course)}
                    >
                        {addedToCart
                            ? "Adicionado ao carrinho!"
                            : "Adicionar ao carrinho"}
                    </Button>
                )}

                <div className="tw-mt-5 tw-text-center">
                    <SocialShare />
                </div>
            </div>
        </>
    );
};

export default CourseInfo;
