export async function fetchAvilablePlaces() {
    const response = await fetch("http://localhost:3000/places");
    const resData = await response.json();
    if (!response.ok) {
        // const error = new Error('Failed to fetch places.');
        // throw error;
        throw new Error("Failed to fetch places.");
    }
    return resData.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch("http://localhost:3000/user-places", {
        method: 'PUT',
        // body: places,
        // body: JSON.stringify(places), //crashes the backend
        // body: JSON.stringify({ places: places }), //bcoz of same nem we can simply use {places}
        body: JSON.stringify({ places }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to update user data.');
    }
    return resData.message;
}

//Fetching user's places
export async function fetchUserPlaces() {
    const response = await fetch("http://localhost:3000/user-places");
    const resData = await response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch user's places.");
    }
    return resData.places;
}