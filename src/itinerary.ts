export interface ItineraryRequest {
    apiKey: string;
    destination: string;
    startDate: string;
    endDate: string;
    persons: number;
}

const allowedApiKeys = ["API_KEY_123", "API_KEY_456"];
export function validateApiKey(apiKey: string): boolean {
    return allowedApiKeys.includes(apiKey);
}

export async function generateItinerary(request: ItineraryRequest) {
    return {
        destination: request.destination,
        startDate: request.startDate,
        endDate: request.endDate,
        persons: request.persons,
        activities: [
            "City Tour",
            "Local Cuisine Tasting",
            "Museum Visit",
            "Beach Day",
        ],
    };
}

export async function createItinerary(request: ItineraryRequest) {
    if (!validateApiKey(request.apiKey)) {
        throw new Error("Invalid API Key");
    }

    return await generateItinerary(request);
}
