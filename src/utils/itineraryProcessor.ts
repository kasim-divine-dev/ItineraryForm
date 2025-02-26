import { FormDetails, ItineraryResult } from '../types';

export const generateItinerary = async (
    apiKey: string,
    formDetails: FormDetails
): Promise<ItineraryResult> => {

    const startDate = new Date(formDetails.startDate);
    const endDate = new Date(formDetails.endDate);

    const days = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        days.push({
            date: currentDate.toISOString().split('T')[0],
            activities: [
                {
                    time: '09:00',
                    activity: 'Breakfast',
                    location: 'Local Cafe',
                    description: 'Start your day with a delicious breakfast at a local cafe.'
                },
                {
                    time: '10:30',
                    activity: 'Sightseeing',
                    location: `${formDetails.destination} Downtown`,
                    description: 'Explore the main attractions of the city.'
                },
                {
                    time: '13:00',
                    activity: 'Lunch',
                    location: 'Restaurant',
                    description: 'Enjoy local cuisine for lunch.'
                },
                {
                    time: '15:00',
                    activity: 'Activity',
                    location: 'Various',
                    description: 'Participate in a local activity or visit a museum.'
                },
                {
                    time: '19:00',
                    activity: 'Dinner',
                    location: 'Restaurant',
                    description: 'Have dinner at a recommended restaurant.'
                }
            ]
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
        destination: formDetails.destination,
        startDate: formDetails.startDate,
        endDate: formDetails.endDate,
        persons: formDetails.persons,
        days,
        summary: `Your ${days.length}-day itinerary for ${formDetails.destination} is ready. This plan accommodates ${formDetails.persons} person(s) and includes daily activities based on popular attractions.`
    };
};