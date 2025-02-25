const allowedApiKeys = ["API_KEY_123", "API_KEY_456"];
export function validateApiKey(apiKey) {
    return allowedApiKeys.includes(apiKey);
}
export async function generateItinerary(request) {
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
export async function createItinerary(request) {
    if (!validateApiKey(request.apiKey)) {
        throw new Error("Invalid API Key");
    }
    return await generateItinerary(request);
}
