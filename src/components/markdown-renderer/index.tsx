import clsx from "clsx";

type TProps = {
    content: string;
    className?: string;
};

const MarkdownRenderer = ({ content, className }: TProps) => {
    return (
        <div
            className={clsx(
                "tw-prose tw-text-base tw-max-w-none prose-strong:tw-font-bold md:prose-h3:tw-text-3xl first:prose-img:tw-mt-0 prose-blockquote:tw-border-l-primary md:prose-blockquote:tw-mt-[50px] md:prose-blockquote:tw-mb-11 md:prose-blockquote:tw-ml-12 prose-blockquote:tw-text-lg prose-blockquote:tw-leading-relaxed prose-blockquote:tw-not-italic",
                className
            )}
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        />
    );
};

export default MarkdownRenderer;
