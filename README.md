# Itinerary Maker

The `ItineraryForm` component is a React component built using TypeScript, TailwindCSS, and React Hook Form. It allows users to input details for planning a trip, including the destination, start date, end date, and number of persons. The form includes validation and handles submission via a callback function.

## Installation

```sh
npm install itinerary-maker
```

## Usage

Import and use the `ItineraryForm` component in your React project:

```tsx
import ItineraryForm from 'itinerary-maker';

const onSubmit = (data: any) => {
  console.log('Received Data:', data);
};

function App() {
  return (
    <ItineraryForm
      apiKey="1234"
      onDataReceived={onSubmit}
      formDetails={{
        destination: 'Tokyo',
        startDate: '2023-01-01',
        endDate: '2023-01-05',
        persons: 2
      }}
      key={'1234'}
    />
  );
}

export default App;
```

## Props

| Prop Name       | Type     | Description |
|----------------|----------|-------------|
| `apiKey`       | `string` | API Key for authentication (if required). |
| `onDataReceived` | `(data: any) => void` | Callback function that receives form data upon submission. |
| `formDetails`  | `{ destination: string, startDate: string, endDate: string, persons: number }` | Initial form details. |

