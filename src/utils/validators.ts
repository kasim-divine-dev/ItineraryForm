import { FormDetails } from "../types";

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(apiKey.length >= 4);
        }, 300);
    });
};

export const validateFormDetails = (details: FormDetails): boolean => {
    if (!details.departureCity || !details.arrivalCity || !details.departureDate || !details.arrivalDate) {
        return false;
    }

    const start = new Date(details.departureDate);
    const end = new Date(details.arrivalDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return false;
    }

    if (end < start) {
        return false;
    }

    if (!details.travelers || details.travelers.adults < 1 || details.travelers.children < 0 || details.travelers.infants < 0) {
        return false;
    }

    if (!details.preferences.activities || details.preferences.activities.length === 0) {
        return false;
    }

    return true;
};