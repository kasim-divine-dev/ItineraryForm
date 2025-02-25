import React from "react";
import { useForm } from "react-hook-form";

export interface FormValues {
    destination: string;
    startDate: string;
    endDate: string;
    persons: number;
}

interface ItineraryFormProps {
    onSubmit: (data: FormValues) => void;
}

const ItineraryForm: React.FC<ItineraryFormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormValues>();

    const today = new Date().toISOString().split("T")[0];
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2); // Max 2 years from today
    const maxDateString = maxDate.toISOString().split("T")[0];

    const startDate = watch("startDate");

    return (
        <div className="flex justify-center items-center min-h-screen bg-black text-white">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Plan Your Trip</h2>
                <div className="mb-4">
                    <label className="block mb-2">Destination</label>
                    <input
                        type="text"
                        {...register("destination", { required: "Destination is required" })}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-white"
                    />
                    {errors.destination && <p className="text-red-500 text-sm">{errors.destination.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Start Date</label>
                    <input
                        type="date"
                        min={today}
                        max={maxDateString}
                        {...register("startDate", {
                            required: "Start date is required",
                            validate: (value) => value >= today || "Start date must be today or later",
                        })}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-white"
                    />
                    {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">End Date</label>
                    <input
                        type="date"
                        min={startDate || today}
                        max={maxDateString}
                        {...register("endDate", {
                            required: "End date is required",
                            validate: (value) => !startDate || value > startDate || "End date must be after start date",
                        })}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-white"
                    />
                    {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
                </div>
                <div className="mb-6">
                    <label className="block mb-2">Persons</label>
                    <input
                        type="number"
                        min={1}
                        max={20}
                        {...register("persons", { required: "Number of persons is required", min: { value: 1, message: "At least 1 person required" }, max: { value: 20, message: "Maximum 20 persons allowed" } })}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-white"
                    />
                    {errors.persons && <p className="text-red-500 text-sm">{errors.persons.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full p-3 bg-white text-black rounded-lg font-bold hover:bg-gray-300 transition"
                >
                    Generate Itinerary
                </button>
            </form>
        </div>
    );
};

export default ItineraryForm;