const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const CUSTOMER_API = {
    UPDATE_PROFILE: `${BASE_URL}/Customer/UpdateProfile`,
    SIGN_UP: `${BASE_URL}/Customer/Register`,
    MASTER: `${BASE_URL}/Customer`,
    GET_DETAILS: `${BASE_URL}/user`,

};

export const PET_API = {
    MASTER: `${BASE_URL}/pet`,
};

export const AUTH_API = {
    LOGIN: `${BASE_URL}/Authentication/login`,
    SIGN_UP: `${BASE_URL}/Customer/Register`,
};
export const SCHEDULE_API = {
    MASTER: `${BASE_URL}/Schedules`,
};
export const BOOKING_API = {
    MASTER: `${BASE_URL}/booking`,
    CREATE_BOOKING_SERVICE: `${BASE_URL}/Booking/create-booking-service`
};

export const DOCTOR_API = {
    MASTER: `${BASE_URL}/Doctor`,
};

export const STAFF_API = {
    MASTER: `${BASE_URL}/Staff`,
};

export const SERVICE_API = {
    MASTER: `${BASE_URL}/Service`,
};

export const SLOT_API = {
    MASTER: `${BASE_URL}/SlotBookings`,
};