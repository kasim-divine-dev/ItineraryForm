import React from "react";
interface ItineraryMakerProps {
    apiKey: string;
    formDetails?: FormValues;
    onDataReceived: (data: any) => void;
}
export interface FormValues {
    destination: string;
    startDate: string;
    endDate: string;
    persons: number;
}
declare const ItineraryMaker: React.FC<ItineraryMakerProps>;
export default ItineraryMaker;
