import { FormDetails } from "../types";

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(apiKey.length >= 4);
        }, 300);
    });
};

export const validateFormDetails = (details: FormDetails): boolean => {
    if (!details.destination || !details.startDate || !details.endDate) {
        return false;
    }

    const start = new Date(details.startDate);
    const end = new Date(details.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return false;
    }

    if (end < start) {
        return false;
    }

    if (!details.persons || details.persons < 1) {
        return false;
    }

    return true;
};