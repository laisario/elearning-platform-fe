import clsx from "clsx";

type TProps = {
    icon?: string;
    label: string;
    value: string | number;
    variant?: "total" | "discounts" | "subtotal";
};

const CourseInfoItem = ({ icon, label, value, variant }: TProps) => {
    return (
        <div className="tw-flex tw-items-center tw-justify-between tw-py-3.8 tw-border-t tw-border-t-gray-500 first:tw-border-0">
            <h6
                className={clsx(
                    "tw-mb-0 tw-text-body",
                    variant !== "total" ? "tw-font-normal" : ""
                )}
            >
                {icon && (
                    <i
                        className={clsx(
                            icon,
                            "tw-text-body tw-min-w-[28px] tw-text-center"
                        )}
                    />
                )}
                {label}
            </h6>
            <span
                className={clsx(
                    "tw-text-right",
                    variant === "total" ? "tw-font-bold" : ""
                )}
            >
                {value}
            </span>
        </div>
    );
};

export default CourseInfoItem;
