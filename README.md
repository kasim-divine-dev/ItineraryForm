# Itinerary Generator

A React component library for generating travel itineraries based on user inputs. Perfect for travel applications, booking websites, and trip planning tools.

## Installation

Install the package using npm:

```bash
npm install itinerary-generator
```

Or using yarn:

```bash
yarn add itinerary-generator
```

## Features

- 🌍 Generate complete travel itineraries for any destination
- 📅 Support for customizable date ranges
- 👥 Accommodates adults, children, and infants
- 🔑 API key integration for secure access
- 📱 Responsive design that works on all devices
- 📝 Detailed daily plans with a single main activity, meal suggestions, and estimated costs
- 🎯 Customizable preferences for activities and budget type

## Quick Start

### Basic Usage

```jsx
import React from 'react';
import ItineraryForm from 'itinerary-generator';

function App() {
  const handleItineraryData = (data) => {
    console.log('Received itinerary data:', data);
    // Process or display the itinerary data
  };

  return (
    <div className="App">
      <h1>Plan Your Trip</h1>
      <ItineraryForm
        apiKey="your-api-key-here"
        onDataReceived={handleItineraryData}
        formDetails={{
          departureCity: 'New York',
          arrivalCity: 'Paris',
          departureDate: '2025-06-10',
          arrivalDate: '2025-06-20',
          travelers: {
            adults: 2,
            children: 1,
            infants: 0,
          },
          preferences: {
            activities: ['City sightseeing', 'Historical sites', 'Shopping'],
            budgetType: 'Mid-range',
          },
        }}
      />
    </div>
  );
}

export default App;
```

## API Reference

### `<ItineraryForm>` Props

| Prop            | Type     | Required | Description                                  |
|----------------|---------|----------|----------------------------------------------|
| apiKey         | string  | Yes      | Your API key for authentication            |
| onDataReceived | function| Yes      | Callback function that receives itinerary data |
| formDetails    | object  | Yes      | Details about the trip (see below)         |
| key            | string  | No       | React key for the component (optional)     |

### `formDetails` Object

| Property       | Type   | Required | Description                              |
|---------------|--------|----------|------------------------------------------|
| departureCity | string | Yes      | The departure city                      |
| arrivalCity   | string | Yes      | The arrival city (destination)          |
| departureDate | string | Yes      | Trip start date in 'YYYY-MM-DD' format  |
| arrivalDate   | string | Yes      | Trip end date in 'YYYY-MM-DD' format    |
| travelers     | object | Yes      | Number of travelers                     |
| preferences   | object | Yes      | Travel preferences (activities, budget) |

### `travelers` Object

| Property  | Type  | Required | Description        |
|----------|------|----------|--------------------|
| adults   | number | Yes     | Number of adults  |
| children | number | Yes     | Number of children |
| infants  | number | Yes     | Number of infants |

### `preferences` Object

| Property   | Type     | Required | Description                                     |
|------------|---------|----------|-------------------------------------------------|
| activities | string[] | Yes      | Preferred activities (e.g., sightseeing, shopping) |
| budgetType | string  | Yes      | Budget type: 'Budget', 'Mid-range', or 'Luxury' |

## Returned Itinerary Data Structure

The `onDataReceived` callback receives an object with the following structure:

```typescript
interface ItineraryResult {
  departure_city: string;
  arrival_city: string;
  departure_date: string;
  arrival_date: string;
  travelers: {
    adults: number;
    children: number;
    infants: number;
  };
  budget_type: 'Budget' | 'Mid-range' | 'Luxury';
  itinerary: ItineraryDay[];
}

interface ItineraryDay {
  day: number;
  date: string;
  activity: string;
  location: string;
  meal_suggestions: string[];
  estimated_cost: number;
  additional_notes: string;
}
```

## Examples

### With Travel Preferences

```jsx
<ItineraryForm
  apiKey="your-api-key-here"
  onDataReceived={handleItineraryData}
  formDetails={{
    departureCity: 'New York',
    arrivalCity: 'Paris',
    departureDate: '2025-06-10',
    arrivalDate: '2025-06-20',
    travelers: {
      adults: 2,
      children: 1,
      infants: 0,
    },
    preferences: {
      activities: ['City sightseeing', 'Historical sites', 'Shopping'],
      budgetType: 'Mid-range',
    },
  }}
/>
```

### Handling the Returned Data

```jsx
import React, { useState } from 'react';
import ItineraryForm from 'itinerary-generator';

function TripPlanner() {
  const [itinerary, setItinerary] = useState(null);

  const handleItineraryData = (data) => {
    setItinerary(data);
  };

  return (
    <div>
      <h1>Trip Planner</h1>
      <ItineraryForm
        apiKey="your-api-key-here"
        onDataReceived={handleItineraryData}
        formDetails={{
          departureCity: 'New York',
          arrivalCity: 'Paris',
          departureDate: '2025-06-10',
          arrivalDate: '2025-06-20',
          travelers: {
            adults: 2,
            children: 1,
            infants: 0,
          },
          preferences: {
            activities: ['City sightseeing', 'Historical sites', 'Shopping'],
            budgetType: 'Mid-range',
          },
        }}
      />
      {itinerary && itinerary.itinerary.map((day, index) => (
        <div key={index}>
          <h3>Day {day.day}: {day.date}</h3>
          <p><strong>Activity:</strong> {day.activity}</p>
          <p><strong>Location:</strong> {day.location}</p>
          <p><strong>Meal Suggestions:</strong> {day.meal_suggestions.join(', ')}</p>
          <p><strong>Estimated Cost:</strong> ${day.estimated_cost} per person</p>
        </div>
      ))}
    </div>
  );
}

export default TripPlanner;
```

## API Key

To obtain an API key, visit our developer portal and register for an account.

## Contributing

We welcome contributions! See `CONTRIBUTING.md` for details.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
