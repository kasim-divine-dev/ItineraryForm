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
        - Adults: ${formDetails.travelers.adults}
        - Children: ${formDetails.travelers.children}
        - Infants: ${formDetails.travelers.infants}
        Preferred Activities: ${formDetails.preferences.activities.join(', ')}
        Budget Type: ${formDetails.preferences.budgetType}

        Constraints:
        - Ensure the output is **strictly** in JSON format.
        - No extra text, explanations, or greetings.
        - Wrap the response **inside a JSON markdown block**.
        - Select one suitable activity per day, ensuring variety based on user preferences.
        - Adjust costs based on the budget type (Budget, Mid-range, Luxury).
        - Meal suggestions should be local and relevant to the arrival city.

        Output Format:
        \`\`\`json
        {
          "departure_city": "${formDetails.departureCity}",
          "arrival_city": "${formDetails.arrivalCity}",
          "departure_date": "${formDetails.departureDate}",
          "arrival_date": "${formDetails.arrivalDate}",
          "travelers": {
              "adults": ${formDetails.travelers.adults},
              "children": ${formDetails.travelers.children},
              "infants": ${formDetails.travelers.infants}
          },
          "budget_type": "${formDetails.preferences.budgetType}",
          "itinerary": [
              {
                "day": 1,
                "date": "YYYY-MM-DD",
                "activity": "Main activity for the day",
                "location": "Activity location",
                                "images":["image_url_1", "image_url_2"], // a real image url of that place from internet
                "meal_suggestions": ["Local dish 1", "Local dish 2"],
                "estimated_cost": "Estimated cost per person",
                "additional_notes": "Any useful travel tips"
              }
          ]
        }
        \`\`\`

        plzz make sure the image is working in real and url is valid
        is possible get images from unsplash , pexel , or any ohter image site platform becuase wikipedia is not working

        `;

        const response = await cohere.chat({
            model: "command-xlarge-nightly",
            messages: [{ role: "user", content: prompt }],
        });

        if (response?.message?.content) {
            const rawText = response.message.content[0].text.trim();

            const match = rawText.match(/```json([\s\S]*?)```/);
            if (match) {
                const jsonText = match[1].trim();
                return JSON.parse(jsonText);
            }

            return JSON.parse(rawText);
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
};
