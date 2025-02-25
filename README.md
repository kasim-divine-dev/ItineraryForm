# ItineraryForm Component

## Description
The `ItineraryForm` component is a React component built using TypeScript, TailwindCSS, and React Hook Form. It allows users to input details for planning a trip, including the destination, start date, end date, and number of persons. The form includes validation to ensure correct input values.

## Features
- Fully responsive and styled with TailwindCSS
- Validations using `react-hook-form`
- Ensures the start date cannot be before today
- Ensures the end date must be after the start date
- Limits the date selection to a maximum of two years from today
- Restricts the number of persons between 1 and 20
- Displays error messages for incorrect inputs

## Installation
Ensure you have React and TailwindCSS installed in your project. You also need `react-hook-form` for form handling.

```sh
npm install react-hook-form
```

## Usage
Import and use the `ItineraryForm` component in your React application.

```tsx
import React from "react";
import ItineraryForm, { FormValues } from "./ItineraryForm";

const handleFormSubmit = (data: FormValues) => {
  console.log("Form Data:", data);
};

const App = () => {
  return (
    <div>
      <ItineraryForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
```

## Props
| Prop Name | Type | Description |
|-----------|------|-------------|
| `onSubmit` | `(data: FormValues) => void` | Function to handle form submission |

## Form Fields
| Field | Type | Validation |
|-------|------|------------|
| `destination` | `string` | Required |
| `startDate` | `string` (date) | Cannot be before today |
| `endDate` | `string` (date) | Must be after `startDate` |
| `persons` | `number` | Minimum 1, Maximum 20 |

## Validation Rules
- The `destination` field is required
- The `startDate` field must be today or later
- The `endDate` field must be after the `startDate`
- The `persons` field must be between 1 and 20

## Styling
The form has a modern black and white theme and is styled using TailwindCSS classes. It provides a smooth and responsive user experience.

## License
This component is open-source and free to use in any project.
