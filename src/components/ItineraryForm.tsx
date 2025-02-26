import React, { useEffect, useState } from 'react';
import { ItineraryFormProps } from '../types';
import { generateItinerary } from '../utils/itineraryProcessor';
import { validateApiKey, validateFormDetails } from '../utils/validators';

const ItineraryForm: React.FC<ItineraryFormProps> = ({
    apiKey,
    onDataReceived,
    formDetails
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const validateAndProcess = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Validate API key
                const isApiKeyValid = await validateApiKey(apiKey);
                if (!isApiKeyValid) {
                    setError('Invalid API key');
                    setIsLoading(false);
                    return;
                }

                // Validate form details
                if (!validateFormDetails(formDetails)) {
                    setError('Invalid form details');
                    setIsLoading(false);
                    return;
                }

                setIsValid(true);

                // Generate itinerary
                const itinerary = await generateItinerary(apiKey, formDetails);

                // Pass the data to the parent component
                onDataReceived(itinerary);

            } catch (err) {
                setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
            } finally {
                setIsLoading(false);
            }
        };

        validateAndProcess();
    }, [apiKey, formDetails, onDataReceived]);

    return (
        <div className="itinerary-form-container">
            {isLoading && (
                <div className="loading">
                    <p>Generating your itinerary...</p>
                </div>
            )}

            {error && (
                <div className="error">
                    <p>{error}</p>
                </div>
            )}

            {!isLoading && !error && isValid && (
                <div className="success">
                    <p>Your itinerary has been generated successfully!</p>
                </div>
            )}
        </div>
    );
};


export default ItineraryForm;