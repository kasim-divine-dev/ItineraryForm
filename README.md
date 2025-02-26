# Itinerary Maker

A React component library for generating travel itineraries based on user inputs. Perfect for travel applications, booking websites, and trip planning tools.

## Installation

Install the package using npm:

```bash
npm install itinerary-maker
```

Or using yarn:

```bash
yarn add itinerary-maker
```

## Features

- 🌍 Generate complete travel itineraries for any destination
- 📅 Support for customizable date ranges
- 👥 Accommodates any number of travelers
- 🔑 API key integration for secure access
- 📱 Responsive design that works on all devices
- 📝 Detailed daily plans with activities, locations, and descriptions

## Quick Start

### Basic Usage

```jsx
import React from 'react';
import ItineraryForm from 'itinerary-maker';

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
          destination: 'Tokyo',
          startDate: '2023-12-01',
          endDate: '2023-12-05',
          persons: 2
        }}
      />
    </div>
  );
}

export default App;
```

## API Reference

### `<ItineraryForm>` Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `apiKey` | string | Yes | Your API key for authentication |
| `onDataReceived` | function | Yes | Callback function that receives the generated itinerary data |
| `formDetails` | object | Yes | Details about the trip (see below) |
| `key` | string | No | React key for the component (optional) |

### `formDetails` Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `destination` | string | Yes | The travel destination |
| `startDate` | string | Yes | Trip start date in 'YYYY-MM-DD' format |
| `endDate` | string | Yes | Trip end date in 'YYYY-MM-DD' format |
| `persons` | number | Yes | Number of travelers |
| `preferences` | object | No | Optional travel preferences |

### `preferences` Object (Optional)

| Property | Type | Description |
|----------|------|-------------|
| `budget` | string | Budget level: 'budget', 'moderate', or 'luxury' |
| `interests` | string[] | Array of travel interests (e.g., ['food', 'history', 'nature']) |
| `transportation` | string | Preferred mode of transport: 'public', 'rental', or 'walking' |

### Returned Itinerary Data Structure

The `onDataReceived` callback function receives an object with the following structure:

```typescript
interface ItineraryResult {
  destination: string;
  startDate: string;
  endDate: string;
  persons: number;
  days: ItineraryDay[];
  summary: string;
}

interface ItineraryDay {
  date: string;
  activities: {
    time: string;
    activity: string;
    location: string;
    description: string;
  }[];
}
```

## Examples

### With Travel Preferences

```jsx
<ItineraryForm
  apiKey="your-api-key-here"
  onDataReceived={handleItineraryData}
  formDetails={{
    destination: 'Paris',
    startDate: '2023-06-15',
    endDate: '2023-06-20',
    persons: 2,
    preferences: {
      budget: 'moderate',
      interests: ['art', 'food', 'history'],
      transportation: 'public'
    }
  }}
/>
```

### Handling the Returned Data

```jsx
import React, { useState } from 'react';
import ItineraryForm from 'itinerary-maker';

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
          destination: 'Rome',
          startDate: '2023-09-10',
          endDate: '2023-09-15',
          persons: 3
        }}
      />
      
      {itinerary && (
        <div>
          <h2>Your {itinerary.days.length}-Day Trip to {itinerary.destination}</h2>
          <p>{itinerary.summary}</p>
          
          {itinerary.days.map((day, index) => (
            <div key={index}>
              <h3>Day {index + 1}: {day.date}</h3>
              <ul>
                {day.activities.map((activity, actIndex) => (
                  <li key={actIndex}>
                    <strong>{activity.time}</strong>: {activity.activity} at {activity.location}
                    <p>{activity.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TripPlanner;
```

## API Key

To obtain an API key, please visit our [developer portal](https://example.com/developer) and register for an account.

## Error Handling

The component will handle various error states internally and display appropriate messages:

- Invalid API key
- Invalid form details (missing required fields or invalid dates)
- Network errors
- API response errors

## TypeScript Support

This package includes TypeScript definitions. Import types as needed:

```typescript
import ItineraryForm, { FormDetails, ItineraryResult } from 'itinerary-maker';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 is not supported

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
