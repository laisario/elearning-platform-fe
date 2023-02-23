type TProps = {
    description: string;
    summary: string;
    introVideo: string;
    introVideoId: string;
};

const OverviewPanel = ({
    description,
    summary,
    introVideo,
    introVideoId,
}: TProps) => {
    return (
        <div className="course-overview tw-prose prose-h2:tw-text-xl sm:prose-h2:tw-text-3xl tw-max-w-none">
            <p>{summary}</p>
            {introVideo && (
                <video controls controlsList="nodownload">
                    <source src={introVideo} type="video/mp4" />
                </video>
            )}
            {introVideoId && <iframe src={introVideo} />}
            <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    );
};

export default OverviewPanel;
