
import axios from "axios";

const GOOGLE_GEOCODING_URL =
    "https://maps.googleapis.com/maps/api/geocode/json";

export const GeoUtils = {

    async getGeoCoding(address) {

        try {

            if (!address) {
                throw new Error("Address is required.");
            }

            const { data } = await axios.get(GOOGLE_GEOCODING_URL, {

                params: {
                    address,
                    key: process.env.GOOGLE_MAPS_API_KEY,
                },

            });

            if (data.status !== "OK") {
                throw new Error(data.error_message || data.status);
            }

            return data.results[0];

        } catch (error) {

            console.error("GeoCoding Error:", error.message);

            throw error;

        }

    },



    async reverseGeoCoding(latitude, longitude) {

        try {

            const { data } = await axios.get(GOOGLE_GEOCODING_URL, {

                params: {

                    latlng: `${latitude},${longitude}`,
                    key: process.env.GOOGLE_MAPS_API_KEY,

                },

            });

            if (data.status !== "OK") {
                throw new Error(data.error_message || data.status);
            }

            return data.results[0];

        } catch (error) {

            console.error("Reverse GeoCoding Error:", error.message);

            throw error;

        }

    },



    calculateDistance(lat1, lon1, lat2, lon2) {

        const toRadians = (degree) => degree * (Math.PI / 180);

        const earthRadius = 6371;

        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =

            Math.sin(dLat / 2) ** 2 +

            Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *

            Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;

    },

};

export default GeoUtils;