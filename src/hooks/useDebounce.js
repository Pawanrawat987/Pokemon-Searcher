import { useRef } from 'react';

// Delays calling `cb` until the user has stopped typing for `delay` ms.
// Using a ref (instead of a plain variable) keeps the same timer across
// re-renders, so we never fire two overlapping API calls by mistake.
function useDebounce(cb, delay = 400) {
    const timerId = useRef(null);

    return (...args) => {
        clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
            cb(...args);
        }, delay);
    };
}

export default useDebounce;
