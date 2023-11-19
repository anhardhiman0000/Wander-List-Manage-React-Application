// //Local storage data fetching
// import { useState } from "react";
// import Places from "./Places.jsx";

// const places = localStorage.getItem("places");

// export default function AvailablePlaces({ onSelectPlace }) {
//   const [availablePlaces, setAvailablePlaces] = useState(places);

//   return (
//     <Places
//       title="Available Places"
//       places={[]}
//       fallbackText="No places available."
//       onSelectPlace={onSelectPlace}
//     />
//   );
// }

import React, { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvilablePlaces } from "../http.js";

// export default async function AvailablePlaces({ onSelectPlace }) {
export default function AvailablePlaces({ onSelectPlace }) {
  //Fetch aviailable places from backend api

  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false); //for loader
  const [error, setError] = useState(); // error handling

  // fetch("http://localhost:3000/places").then((response)=>)
  //In modern js
  // const response = await fetch("http://localhost:3000/places");

  // fetch("http://localhost:3000/places")
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((resData) => {
  //     setAvailablePlaces(resData.places);
  //   });                                     // -->X Will not work may go in infinite loop

  // useEffect(() => {
  //   fetch("http://localhost:3000/places")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((resData) => {
  //       setAvailablePlaces(resData.places);
  //     });
  // }, []);

  //async await use
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      // const response = await fetch("http://localhost:3000/places");
      // const resData = await response.json();

      //Error handling
      // if (!response.ok) {
      //   // const error = new Error('Failed to fetch places.');
      //   // throw error;
      //   throw new Error("Failed to fetch places.");
      // }                                                // this can crash the aap so use try catch

      try {
        // const response = await fetch("http://localhost:3000/places");
        // const resData = await response.json();
        // if (!response.ok) {
        //   // const error = new Error('Failed to fetch places.');
        //   // throw error;
        //   throw new Error("Failed to fetch places.");
        // }                                                 // ----------->move to http.js

        const places=await fetchAvilablePlaces();

        //to get the current location of user
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            // resData.places,
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          // setAvailablePlaces(resData.places);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false); //bcoz we do not use async await, so it will not wait and give false.Tht's why I put it here
        });

        // setAvailablePlaces(resData.places);
      } catch (error) {
        // setError(error);
        setError({
          message:
            error.message || "Could not fetch data, please try again later!.",
        });
        setIsFetching(false);
      }
      // setAvailablePlaces(resData.places);
      // setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      // places={[]}
      places={availablePlaces}
      // isLoading={true} // false once data arrived
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
