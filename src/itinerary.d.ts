export interface ItineraryRequest {
    apiKey: string;
    destination: string;
    startDate: string;
    endDate: string;
    persons: number;
}
export declare function validateApiKey(apiKey: string): boolean;
export declare function generateItinerary(request: ItineraryRequest): Promise<{
    destination: string;
    startDate: string;
    endDate: string;
    persons: number;
    activities: string[];
}>;
export declare function createItinerary(request: ItineraryRequest): Promise<{
    destination: string;
    startDate: string;
    endDate: string;
    persons: number;
    activities: string[];
}>;
