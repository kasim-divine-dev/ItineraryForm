import { jsx as _jsx } from "react/jsx-runtime";
import ItineraryForm from './components/ItineraryForm';
const App = () => {
    const onSubmit = (data) => {
        console.log('itinerary data', data);
    };
    return (_jsx(ItineraryForm, { apiKey: '1234', onDataReceived: onSubmit, formDetails: { destination: 'Tokyo', startDate: '2023-01-01', endDate: '2023-01-05', persons: 2 } }, '1234'));
};
export default App;
