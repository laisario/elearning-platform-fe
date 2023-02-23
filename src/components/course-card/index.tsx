import { forwardRef } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";

interface TProps
    extends Pick<
        ICourse,
        "image" | "name" | "price" | "category" | "summary" | "created_at"
    > {
    className?: string;
    path?: string;
    noShowPrice?: boolean;
}

const CourseCard = forwardRef<HTMLDivElement, TProps>(
    (
        {
            className,
            image,
            name,
            price,
            summary,
            category,
            created_at,
            path,
            noShowPrice,
        },
        ref
    ) => {
        const priceConv = price === 0 ? "free" : `R$${price}`;
        return (
            <div
                className={clsx(
                    "tw-overflow-hidden tw-transition-all tw-bg-gray-100 tw-rounded tw-h-full group hover:tw-bg-white hover:tw-shadow-4xl hover:tw-shadow-black/[0.12]",
                    className
                )}
                ref={ref}
            >
                <figure className="tw-relative tw-overflow-hidden">
                    {image && (
                        <img
                            src={image}
                            alt={name}
                            width={370}
                            height={229}
                            loading={"lazy"}
                            className="tw-w-full tw-transition-transform tw-duration-1000 tw-ease-out group-hover:tw-scale-110"
                        />
                    )}

                    <Anchor className="link-overlay" path={path}>
                        {name}
                    </Anchor>
                </figure>
                <div className="tw-relative tw-px-7.5 tw-pt-7.5 tw-pb-10">
                    {!noShowPrice && (
                        <span className="tw-capitalize tw-font-extrabold tw-bg-primary tw-text-white tw-leading-none tw-rounded-full tw-flex tw-justify-center tw-items-center tw-absolute tw-right-5 -tw-translate-y-1/2 tw-top-0 tw-w-[80px] tw-h-[80px] tw-text-md md:tw-w-[90px] md:tw-h-[90px] md:tw-text-lg">
                            {priceConv}
                        </span>
                    )}
                    <span className="tw-font-medium tw-block tw-uppercase tw-mb-1 tw-tracking-[2px] tw-text-secondary-light">
                        {category.name ||
                            dayjs(created_at).format("DD/MM/YYYY")}
                    </span>
                    <h3 className="tw-leading-normal tw-text-secondary tw-m-0">
                        <Anchor path={path}>{name}</Anchor>
                    </h3>
                    {summary && <p className="tw-mt-2.5">{summary}</p>}
                </div>
            </div>
        );
    }
);

export default CourseCard;
