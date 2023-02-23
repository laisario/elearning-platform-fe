import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";
import Button from "@components/ui/button";
import { useCart } from "@contexts/cart-context";

type TProps = Pick<
    ICourse,
    "id" | "image" | "name" | "price" | "lessons_count" | "students_count"
> & {
    className?: string;
    path: string;
};

const CourseCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, image, name, path, price, lessons_count, id }, ref) => {
        const { removeFromCart } = useCart();

        return (
            <div
                className={clsx(
                    "course-card tw-flex tw-flex-wrap sm:tw-flex-nowrap sm:tw-items-center tw-h-full tw-p-5 tw-rounded tw-bg-white tw-relative",
                    "before:tw-absolute before:tw-content-[''] before:tw-inset-0 before:tw-shadow-4md before:tw-shadow-black/5 before:tw-rounded-b before:tw-transition-opacity before:tw-opacity-0",
                    "hover:before:tw-opacity-100 tw-justify-between",
                    className
                )}
                ref={ref}
            >
                <div className="tw-flex tw-flex-row tw-items-center">
                    <div className="tw-relative tw-z-1 tw-flex tw-overflow-hidden tw-rounded-full tw-w-[170px] tw-min-w-[170px] tw-h-[170px]">
                        {image && (
                            <img
                                className="tw-w-full tw-h-full tw-object-cover"
                                src={image}
                                alt="Course"
                                width={170}
                                height={170}
                                loading="lazy"
                            />
                        )}
                        <Anchor path={path} className="link-overlay">
                            {name}
                        </Anchor>
                    </div>
                    <div className="info tw-z-1 tw-mt-5 sm:tw-mt-0 sm:tw-pl-7.5">
                        <span className="tw-text-primary tw-text-xl sm:tw-text-2xl tw-font-extrabold tw-leading-none tw-inline-flex tw-mb-1 sm:tw-mb-2">
                            R$
                            {price.toString().split(".")[0]}
                            <span className="tw-text-lg">
                                .{price.toString().split(".")[1]}
                            </span>
                        </span>
                        <h3 className="tw-text-xl tw-leading-normal tw-mb-0">
                            <Anchor path={path}>{name}</Anchor>
                        </h3>
                        {!!lessons_count && (
                            <ul className="tw-text-sm sm:tw-text-md tw-flex tw-flex-wrap tw-mt-2.5 ">
                                <li className="tw-mr-7">
                                    <i className="far fa-file-alt tw-mr-2.5" />
                                    {lessons_count} Aulas
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
                <Button
                    className="tw-cursor-pointer tw-z-50"
                    variant="texted"
                    onClick={() => removeFromCart(id)}
                >
                    <i className="far fa-trash-alt" />
                </Button>
            </div>
        );
    }
);

export default CourseCard;
