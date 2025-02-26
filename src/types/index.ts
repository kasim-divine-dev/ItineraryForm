export interface FormDetails {
    destination: string;
    startDate: string;
    endDate: string;
    persons: number;
    preferences?: {
        budget?: 'budget' | 'moderate' | 'luxury';
        interests?: string[];
        transportation?: 'public' | 'rental' | 'walking';
    };
}

export interface ItineraryDay {
    date: string;
    activities: {
        time: string;
        activity: string;
        location: string;
        description: string;
    }[];
}

export interface ItineraryResult {
    destination: string;
    startDate: string;
    endDate: string;
    persons: number;
    days: ItineraryDay[];
    summary: string;
}

export interface ItineraryFormProps {
    apiKey: string;
    onDataReceived: (data: ItineraryResult) => void;
    formDetails: FormDetails;
    key?: string;
}