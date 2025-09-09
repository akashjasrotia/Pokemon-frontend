import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PokemonCard from "../components/Card";
import { useNavigate } from "react-router-dom";
export default function Cought() {
    const navigate = useNavigate();
  const [data, setData] = useState([]);
  const fetchCought = async () => {
    try {
      const res =await fetch("http://localhost:3000/cought", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setData(data.cought);
      } else {
        toast.error("Error fetching cought pokemons");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    fetchCought();
  });
  return (
    <div className="items-center min-h-screen bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50 flex flex-col py-12 text-black relative overflow-hidden">
        <button className="absolute top-6 left-10 px-6 py-2 rounded-2xl bg-yellow-400 text-black font-bold border-2 border-black shadow-[3px_3px_0px_black] hover:translate-y-[-3px] hover:shadow-[5px_5px_0px_black] active:translate-y-[2px] active:shadow-none transition-all" onClick={() => navigate(-1)}>
            Back
          </button>
      <h1 className="text-5xl font-extrabold text-black border-4 border-black bg-yellow-300 px-6 py-2 rounded-2xl shadow-[6px_6px_0px_black] tracking-wide mt-10 mb-12">
        Cought Pokemons
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 transition-all duration-300">
        {data.map((pokemon, index) => (
          <PokemonCard name={pokemon.name} key={index} />
        ))}
      </div>
    </div>
  );
}
