
import { CohereClientV2 } from "cohere-ai";
import { FormDetails } from "../types";
const cohere = new CohereClientV2({
    token: 'GOWEO5XUal8nAkNHam9j3qz92cv4Kj7nZPjKx4mu',
});

export const generateItineraryFromAi = async (formDetails: FormDetails) => {

    try {
        const prompt = `
                    You are a travel itinerary expert. Generate a structured, day-wise travel itinerary in JSON format based on the following user inputs. The itinerary should have one main activity per day rather than separate morning, afternoon, and evening activities.

            User Inputs:
            Departure City: ${formDetails.departureCity}
            Arrival City: ${formDetails.arrivalCity}
            Departure Date: ${formDetails.departureDate}
            Arrival Date: ${formDetails.arrivalDate}
            Number of Travelers:
            Adults: ${formDetails.travelers.adults}
            Children: ${formDetails.travelers.children}
            Infants: ${formDetails.travelers.infants}
            Preferred Activities (select all that apply):  ${formDetails.preferences.activities.join(', ')}
            Budget Type: ${formDetails.preferences.budgetType}

            Output Format:
            Generate a structured JSON response where each day of the trip includes:
            "day": Day number
            "date": Date in YYYY-MM-DD format
            "activity": A single main activity per day based on user preferences
            "location": The place where the activity happens
            "meal_suggestions": A list of local food recommendations based on budget type
            "estimated_cost": Estimated total cost per person based on budget and activity
            "additional_notes": Any travel tips, ticket booking advice, or local insights

            Constraints:
            Ensure the output is always in a consistent JSON format.
            Select one suitable activity per day, ensuring variety based on user preferences.
            Adjust costs based on the budget type (Budget, Mid-range, Luxury).
            Meal suggestions should be local and relevant to the arrival city.
            If the user selects multiple preferences, rotate between activity types for variation.
            If a festival or event occurs during the stay, prioritize it on the corresponding date.

            {
            "departure_city": "New York",
            "arrival_city": "Paris",
            "departure_date": "2025-06-10",
            "arrival_date": "2025-06-20",
            "travelers": {
                "adults": 2,
                "children": 1,
                "infants": 0
            },
            "budget_type": "Mid-range",
            "itinerary": [
                {
                "day": 1,
                "date": "2025-06-11",
                "activity": "Visit the Eiffel Tower with guided access to the summit",
                "location": "Eiffel Tower, Paris",
                },
                {
                "day": 2,
                "date": "2025-06-12",
                "activity": "Private Seine River cruise with dinner",
                "location": "Seine River, Paris",
                },
                {
                "day": 3,
                "date": "2025-06-13",
                "activity": "Explore the Louvre Museum with an art expert",
                "location": "Louvre Museum, Paris",
                }
            ]
            }
      `
        const response = await cohere.chat({
            model: "command-xlarge-nightly",
            messages: [{ role: "user", content: prompt }],
        });

        if (response?.message?.content) {
            const dietPlanText = response.message.content[0].text.trim();
            console.log('Diet Plan Text:', dietPlanText);
            return JSON.parse(dietPlanText);
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
};
