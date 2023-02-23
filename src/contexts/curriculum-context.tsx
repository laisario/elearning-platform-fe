import { createContext, useContext, useMemo, useReducer } from "react";
import { ISection, ILesson } from "@utils/types";

// Curriculum Context

export type CurriculumContextType = {
    curriculum: ISection[];
    lessons: ILesson[];
    totalLessons: number;
    searchCurriculum: (search: string) => void;
};

export const CurriculumContext = createContext({} as CurriculumContextType);

// Curriculum Reducer
interface CurAction {
    type: "SEARCH_LESSON";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
}

function reducer(
    state: Omit<CurriculumContextType, "searchCurriculum">,
    action: CurAction
) {
    switch (action.type) {
        case "SEARCH_LESSON": {
            const search = action.payload as string;

            const curriculum = state.curriculum
                .map((cc) => {
                    const lessons = cc.lessons.filter((lsn) => {
                        return lsn.name
                            .toLowerCase()
                            .includes(search.toLowerCase());
                    });
                    return {
                        ...cc,
                        lessons,
                    };
                })
                .filter(Boolean);

            return {
                ...state,
                curriculum,
            };
        }
        default:
            return state;
    }
}

// Curriculum Context Provider

type TProps = {
    children: React.ReactNode;
    curriculum: ISection[];
};

export const CurriculumProvider = ({ children, curriculum }: TProps) => {
    const totalLessons = curriculum?.reduce(
        (acc, cur) => acc + cur.lessons.length,
        0
    );

    const lessons = curriculum?.reduce(
        (acc, section) => [...acc, ...section.lessons],
        [] as ILesson[]
    );

    const [state, dispatch] = useReducer(reducer, {
        totalLessons,
        curriculum,
        lessons,
    });

    const value = useMemo(
        () => ({
            ...state,
            searchCurriculum: (data: string) => {
                dispatch({
                    type: "SEARCH_LESSON",
                    payload: data,
                });
            },
        }),
        [state]
    );

    return (
        <CurriculumContext.Provider value={value}>
            {children}
        </CurriculumContext.Provider>
    );
};

// Curriculum Context Consumer hooks

export const useCurriculumContext = () => useContext(CurriculumContext);
