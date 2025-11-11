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

export const formatUTCDateTime = (date) => {
    return new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    }).format(date)
        .replace(/(\d{4})-(\d{2})-(\d{2})/, '$1-$2-$3');
}

export const toLocaleTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })
}

export const toLocaleDateTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: "2-digit",
        minute: "2-digit",
    })
}

export const toLocaleDate = (date) => {
    return new Date(date).toLocaleDateString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
}

export const isSameDay = (date1, date2) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
}

export const formatDividerDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (isSameDay(date, today)) {
        return 'Today';
    }
    if (isSameDay(date, yesterday)) {
        return 'Yesterday';
    }

    return toLocaleDate(date);
}

export const validateUrl = (url) => {
    if (!url) return {isValid: true, message: ''};

    try {
        const urlObj = new URL(url);

        const allowedProtocols = ['http:', 'https:'];
        if (!allowedProtocols.includes(urlObj.protocol)) {
            return {
                isValid: false,
                message: 'Only http and https protocols are allowed.'
            };
        }

        if (!urlObj.hostname) {
            return {isValid: false, message: 'Invalid domain'};
        }

        return {isValid: true, message: ''};
    } catch (error) {
        return {
            isValid: false,
            message: 'Incorrect link format'
        };
    }
};


export const isDeepEmpty = (value) => {
    return value === null || value === ''
        || value === undefined || !value;
}
