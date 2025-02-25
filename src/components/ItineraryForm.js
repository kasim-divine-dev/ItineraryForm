import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { createItinerary } from "../itinerary";
const ItineraryMaker = ({ apiKey, formDetails, onDataReceived }) => {
    const { register, handleSubmit, watch, formState: { errors }, } = useForm({ defaultValues: formDetails });
    const today = new Date().toISOString().split("T")[0];
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    const maxDateString = maxDate.toISOString().split("T")[0];
    const startDate = watch("startDate");
    // Submit Form & Call API
    const onSubmit = async (data) => {
        try {
            const itinerary = await createItinerary({ ...data, apiKey });
            onDataReceived(itinerary); // Send generated itinerary back to client
        }
        catch (error) {
            alert(error.message); // Handle error
        }
    };
    return (_jsx("div", { className: "flex justify-center items-center min-h-screen bg-black text-white", children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-center", children: "Plan Your Trip" }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block mb-2", children: "Destination" }), _jsx("input", { type: "text", ...register("destination", { required: "Destination is required" }), className: "w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-white" }), errors.destination && _jsx("p", { className: "text-red-500 text-sm", children: errors.destination.message })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block mb-2", children: "Start Date" }), _jsx("input", { type: "date", min: today, max: maxDateString, ...register("startDate", { required: "Start date is required" }), className: "w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-white" }), errors.startDate && _jsx("p", { className: "text-red-500 text-sm", children: errors.startDate.message })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block mb-2", children: "End Date" }), _jsx("input", { type: "date", min: startDate || today, max: maxDateString, ...register("endDate", {
                                required: "End date is required",
                                validate: (value) => !startDate || value > startDate || "End date must be after start date",
                            }), className: "w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-white" }), errors.endDate && _jsx("p", { className: "text-red-500 text-sm", children: errors.endDate.message })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block mb-2", children: "Persons" }), _jsx("input", { type: "number", min: 1, max: 20, ...register("persons", { required: "Number of persons is required" }), className: "w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-white" }), errors.persons && _jsx("p", { className: "text-red-500 text-sm", children: errors.persons.message })] }), _jsx("button", { type: "submit", className: "w-full p-3 bg-white text-black rounded-lg font-bold hover:bg-gray-300 transition", children: "Generate Itinerary" })] }) }));
};
export default ItineraryMaker;
