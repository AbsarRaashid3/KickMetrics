import React, { useState, useEffect } from "react";
import players from "../players";
import { useGetCountriesQuery,useGetLeaguesQuery } from '../redux/slices/externalApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
const UserDashboard = () => {

  const [favorites, setFavorites] = useState([]);
  const { data: countries, isLoadingCountries, errorCountries } = useGetCountriesQuery();
  const { data: leagues, isLoadingLeagues, errorLeagues } = useGetLeaguesQuery();

  console.log(leagues);
  console.log(countries);


  const addFavoritePlayer = (player) => {
    if (!favorites.find((fav) => fav._id === player._id)) {
      setFavorites([...favorites, player]);
    }
  };

  const removeFavoritePlayer = (playerId) => {
    setFavorites(favorites.filter((fav) => fav._id !== playerId));
  };

  return (
    <>
      {(isLoadingCountries || isLoadingLeagues)  ? (<Loader />) : (errorCountries || errorLeagues) ?
        (<Message variant='danger'>
          {errorCountries?.data?.message  || errorLeagues?.data?.message}
        </Message>) : (
          <h1 style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

          }} />
        )
      }

      <div className="container mt-2 scout-dashboard">
        {/* League Standings Section */}
        <div className="p-4 rounded shadow-lg"
          style={{
            background: "linear-gradient(135deg, #670d0d,  #223a6a)",
          }}
        >
          <h3 className="text-center mb-4 bold text-secondary">Ongoing Leagues</h3>

          {isLoadingLeagues ? (
            <p className="text-center fs-5">Loading Leagues...</p>
          ) : errorLeagues ? (
            <p className="text-center text-danger fs-5">Error loading Leagues</p>
          ) : (
            <>
              {leagues.result.map((row, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
                  <div className="card text-center shadow-sm border-0 w-100">
                    <div className="card-body d-flex flex-column align-items-center">
                      <img
                        src={row.league_logo}
                        alt={row.league_name}
                        className="mb-3"
                        style={{ width: "90px", height: "auto" }}
                      />
                      <h5 className="card-title fw-bold">{row.league_name}</h5>
                      <div className="d-flex align-items-center mt-auto">
                        <img
                          src={row.country_logo}
                          alt={row.country_name}
                          className="rounded-circle border me-2"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <span className="fw-bold text-dark">{row.country_name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
</>
          )}
        </div>

        {/* Add to Favorite Players */}
        <h3>Add to Favorite Players</h3>
        <select
          className="form-select add-favorite-dropdown"
          onChange={(e) => {
            const player = players.find((p) => p._id === e.target.value);
            addFavoritePlayer(player);
          }}
        >
          <option value="">Select a Player</option>
          {players.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name}
            </option>
          ))}
        </select>



      </div>
    </>
  );

};

export default UserDashboard;
