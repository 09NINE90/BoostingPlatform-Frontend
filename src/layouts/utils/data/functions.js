import {useEffect, useRef, useState} from "react";

export const useIsTextOverflowed = () => {
    const [isOverflowed, setIsOverflowed] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            setIsOverflowed(
                textRef.current.scrollWidth > textRef.current.clientWidth
            );
        }
    }, []);

    return [textRef, isOverflowed];
}

