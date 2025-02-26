import { FormDetails, ItineraryResult, ItineraryDay } from '../types';

const activities = {
    Beaches: ['Relax at the beach', 'Snorkeling', 'Beach volleyball'],
    'City sightseeing': ['Guided city tour', 'Visit landmarks', 'Explore local markets'],
    Nightlife: ['Nightclub visit', 'Bar hopping', 'Live music show'],
    Shopping: ['Visit shopping malls', 'Explore local boutiques', 'Street market shopping'],
    'Festivals/events': ['Attend local festival', 'Cultural event', 'Concert'],
    'Spa & Wellness': ['Spa day', 'Yoga session', 'Wellness retreat'],
    'Historical sites': ['Guided historical tour', 'Visit museums', 'Explore ancient ruins'],
    'Outdoor Adventures': ['Hiking', 'Zip-lining', 'Kayaking']
};

const mealSuggestions = {
    Budget: ['Street food', 'Local diners', 'Fast food'],
    'Mid-range': ['Casual dining', 'Local cuisine restaurants', 'Cafes'],
    Luxury: ['Fine dining', 'Gourmet restaurants', 'Michelin-starred restaurants']
};

const estimatedCosts = {
    Budget: [20, 50],
    'Mid-range': [50, 100],
    Luxury: [100, 300]
};

export const generateItinerary = async (
    apiKey: string,
    formDetails: FormDetails
): Promise<ItineraryResult> => {
    const startDate = new Date(formDetails.departureDate);
    const endDate = new Date(formDetails.arrivalDate);
    const days: ItineraryDay[] = [];
    let dayCount = 1;

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const activityType = formDetails.preferences.activities[dayCount % formDetails.preferences.activities.length];
        const activity = activities[activityType as keyof typeof activities][Math.floor(Math.random() * activities[activityType as keyof typeof activities].length)]; const mealSuggestion = mealSuggestions[formDetails.preferences.budgetType][Math.floor(Math.random() * mealSuggestions[formDetails.preferences.budgetType].length)];
        const estimatedCost = estimatedCosts[formDetails.preferences.budgetType][0] + Math.random() * (estimatedCosts[formDetails.preferences.budgetType][1] - estimatedCosts[formDetails.preferences.budgetType][0]);

        days.push({
            day: dayCount,
            date: currentDate.toISOString().split('T')[0],
            activity,
            location: formDetails.arrivalCity,
            meal_suggestions: [mealSuggestion],
            estimated_cost: Math.round(estimatedCost),
            additional_notes: 'Check local guides for more tips and ticket booking advice.'
        });

        currentDate.setDate(currentDate.getDate() + 1);
        dayCount++;
    }

    return {
        departure_city: formDetails.departureCity,
        arrival_city: formDetails.arrivalCity,
        departure_date: formDetails.departureDate,
        arrival_date: formDetails.arrivalDate,
        travelers: formDetails.travelers,
        budget_type: formDetails.preferences.budgetType,
        itinerary: days
    };
};