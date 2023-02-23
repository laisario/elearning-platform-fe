import ProgressBar from "@ui/progress-bar";
import StarRating from "@ui/star-rating";
import Review from "@components/review";
import { ReviewType } from "@utils/types";

interface IReview {
    reviews: ReviewType[];
}

const getSumByRating = (reviews: ReviewType[]) => {
    const sumByRating = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach((review) => {
        sumByRating[review.rating] = sumByRating[review.rating]
            ? sumByRating[review.rating]++
            : 1;
    });
    return sumByRating;
};

const getAverageRating = (reviews: ReviewType[]) => {
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = Number((sum / reviews.length).toFixed(2));
    return average;
};

const ReviewPanel = (props: IReview) => {
    const reviews = props.reviews;
    const sumByRating = getSumByRating(reviews);
    const average = getAverageRating(reviews);
    return (
        <>
            <div className="tw-flex tw-flex-wrap">
                <div className="tw-shrink-0 tw-w-full tw-mb-7.5 sm:tw-mb-0 sm:tw-w-[200px] sm:tw-mr-7.5 md:tw-mr-[70px]">
                    <div className="tw-bg-white tw-text-center tw-pt-[34px] tw-pb-[38px] tw-px-7.5 tw-shadow-2sm tw-shadow-heading/10">
                        <div className="tw-text-[56px] tw-font-semibold tw-leading-none tw-mb-2 tw-text-primary">
                            {average}
                        </div>
                        <StarRating rating={average} />
                        <div className="tw-mt-0.5">
                            ({reviews.length} avaliacoes)
                        </div>
                    </div>
                </div>
                <div className="tw-grow">
                    {Object.entries(sumByRating).map(([key, value]) => (
                        <div className="tw-flex tw-items-center" key={key}>
                            <StarRating
                                rating={+key}
                                size="sm"
                                align="left"
                                className="tw-shrink-0 tw-mr-5"
                            />
                            <ProgressBar
                                color="primary"
                                now={value ? 50 : 0}
                                disableAnimation
                                className="tw-grow"
                            />
                            <span className="tw-shrink-0 tw-text-gray-400 tw-font-medium tw-min-w-[25px] tw-text-right tw-ml-1">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {reviews.length > 0 && (
                <ul className="course-reviews-list tw-mt-[50px]">
                    {reviews.map((item) => (
                        <li
                            key={item.id}
                            className="tw-mb-7.5 tw-pl-[5px] tw-pr-5 tw-pt-5 tw-pb-7 tw-border-b tw-border-b-gray-500 tw-mt-2.5 first:tw-mt-0 last:tw-mb-0"
                        >
                            <Review {...item} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default ReviewPanel;
