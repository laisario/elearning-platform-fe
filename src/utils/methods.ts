/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

export const slugify = (text: string): string => {
    if (!text) return "";
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
};

export const unslugify = (text: string): string => {
    if (!text) return "";
    return text
        .replace(/-/g, " ") // Replace spaces with -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
};
export const isObjectEmpty = (object: { [key: string]: unknown }) => {
    return Object.keys(object).length === 0;
};

export const toCapitalize = (text: string) => {
    return (
        text.toLowerCase().charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    );
};

export const normalizePath = (path: string) => {
    return path.startsWith("/") ? path.slice(1) : path;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flatDeep = <T>(arr: any[], d = 1): T[] => {
    return d > 0
        ? arr.reduce((acc, val) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              return acc.concat(
                  Array.isArray(val) ? flatDeep<T>(val, d - 1) : val
              );
          }, [])
        : arr.slice();
};

// Check object has the key or not
export const hasKey = (obj: unknown, key: string): boolean => {
    return !!Object.prototype.hasOwnProperty.call(obj, key);
};

// Get focuseable element
export const getFocusableElements = (
    parent?: HTMLElement | null
): HTMLElement[] => {
    if (!parent) return [];

    return (
        Array.from(
            parent.querySelectorAll(
                "a[href], button, input, textarea, select, details,[tabindex]"
            )
        )
            .filter(
                (el) =>
                    el.getAttribute("tabindex") !== "-1" &&
                    !el.hasAttribute("disabled") &&
                    !el.getAttribute("aria-hidden")
            )
            // sort tabindexes as follows: 1, 2, 3, 4, ..., 0, 0, 0
            .sort((a, b) => {
                const aIndex = Number(a.getAttribute("tabindex")) ?? 0; // no `tabindex` means `tabindex=0` on a focusable element
                const bIndex = Number(b.getAttribute("tabindex")) ?? 0;
                if (aIndex === bIndex) return 0;
                if (aIndex === 0) return 1;
                if (bIndex === 0) return -1;
                return aIndex < bIndex ? -1 : 1;
            }) as HTMLElement[]
    );
};

// Focus on the next focusable element
export const nextFocus = (elements: HTMLElement[], forward = true) => {
    const currentIndex = elements.findIndex(
        (e) => e === document.activeElement
    );
    let nextIndex = 0;

    if (currentIndex > -1) {
        if (forward) {
            nextIndex =
                currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex =
                currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
        }
    }

    elements[nextIndex]?.focus();
};
