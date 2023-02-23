export type IDType = string | number;

export interface ImageType {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    loading?: "lazy" | "eager";
}

export interface HeadingType {
    id: IDType;
    content: string;
}

export interface TextType {
    id: IDType;
    content: string;
}

export interface ButtonType {
    id: IDType;
    content: string;
    modal?: string;
    icon?: string;
}

export interface SectionTitleType {
    title: string;
    subtitle?: string;
}

export interface AnchorType {
    id: IDType;
    path: string;
    content: string;
}

export interface VideoType {
    videoId: string;
}

export interface MottoType {
    text: string;
    path: string;
    pathText: string;
}

export interface ItemType {
    id: IDType;
    title: string;
    description: string;
    icon: string;
    path: string;
    pathText: string;
    suffix: string;
    counter: number;
    name: string;
    designation: string;
    rating: number;
    role: "admin" | "employee";
    headings: HeadingType[];
    texts: TextType[];
    images: ImageType[];
    motto: MottoType;
}

export interface SectionType {
    headings?: HeadingType[];
    texts?: TextType[];
    buttons?: ButtonType[];
    images?: ImageType[];
    anchors?: AnchorType[];
    section_title?: SectionTitleType;
    video?: VideoType;
    items?: ItemType[];
}

export type ListContentType = {
    text: string;
    type: "list" | "order-list";
    content: string[] | ListContentType[];
};

export interface IContent {
    id: IDType;
    text: string;
    type:
        | "text"
        | "heading"
        | "iframe"
        | "h3"
        | "h4"
        | "h5"
        | "list"
        | "order-list"
        | "blockquote";
    content:
        | string
        | { src: string; alt?: string }
        | string[]
        | ListContentType[];
}

export interface ReviewType {
    id: number;
    user: {
        name: string;
        avatar: string;
    };
    rating: 1 | 2 | 3 | 4 | 5;
    title: string;
    description: string;
}

export interface ILesson {
    id: number;
    name: string;
    video?: string;
    video_id?: string;
    duration: string;
    description: string;
    summary: string;
    next?: any;
    prev?: any;
}

export interface IChapter {
    id: IDType;
    name: string;
    summary: string;
    lessons: ILesson[];
}

export interface ICurriculum extends Omit<IChapter, "lessons"> {
    lessons: ILesson[];
}

export interface ICategory {
    id: number;
    name: string;
}

export interface ISection {
    id: number;
    name: string;
    summary: string;
    lessons: ILesson[];
}

export interface ICourse {
    summary: string;
    cc: string[];
    id: number;
    name: string;
    slug: string;
    created_at: string;
    category: ICategory;
    image: string;
    thumbnail: string;
    price: number;
    duration: string;
    description?: string;
    reviews?: ReviewType[];
    curriculum: IDType[];
    intro_video_id: string;
    lessons_count: number;
    students_count: number;
    availability: string;
    sections: ISection[];
}

export interface ISocial {
    label: string;
    icon: string;
    url: string;
}

export type FieldType<T> = Array<keyof T> | "all";

export interface ILocation {
    venue: string;
    town: string;
    city: string;
    country: string;
    zip: string;
    latitude: number;
    longitude: number;
}

export interface ISpeaker {
    id: IDType;
    name: string;
    designation: string;
    image: ImageType;
}

export interface IZoomMeeting {
    id: IDType;
    title: string;
    slug: string;
    path: string;
    host: string;
    thumbnail: ImageType;
    date: string;
    time: string;
    start_date: string;
    timezone: string;
    duration: number;
    category: string;
    meeting_id: string;
    links: string[];
    body: IContent[];
}

export type TSubMenu = {
    id: number;
    label: string;
    path: string;
    status?: string;
};

export type TMegaMenu = {
    id: number;
    title?: string;
    submenu?: TSubMenu[];
    banner?: {
        path: string;
        image: ImageType;
    };
};

export type TMenu = TSubMenu & {
    submenu?: TSubMenu[];
    megamenu?: TMegaMenu[];
};

export type TSection = {
    space?:
        | "top-bottom"
        | "top-bottom-2"
        | "top-bottom-3"
        | "top"
        | "top-2"
        | "bottom"
        | "bottom-2"
        | "bottom-3"
        | "none";
    bg?: string;
    titleSize?: "default" | "large";
    className?: string;
};
