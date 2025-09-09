import React, {useRef, useEffect } from "react";
import {toast} from "react-hot-toast";
import {gsap} from 'gsap';
export default function Details({ isOpen, handleClose, pokemon }) {
  const container = useRef(null);

 
  const handleCatch = async(pokemon)=>{
    try {
      const res = await fetch("http://localhost:3000/catch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({pokemon:{
          name:pokemon.name
        }}),
      })
      const data = await res.json();
      if (res.ok) {
        toast.success(`${pokemon.name} caught!`);
        handleClose();
      } else {
        toast.error(data.message || "Failed to catch Pokémon");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
   useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        container.current,
        { y: 5 },
        {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease:'sine.inOut'
        }
      );
    })
    return () => ctx.revert();
  },[])
  if (!isOpen || !pokemon) return null;
  return (
    <div
      className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-black/70"
      onClick={handleClose}
    >
      <div ref={container}
        className="bg-yellow-100 text-black rounded-2xl border-4 border-black shadow-[8px_8px_0px_black] w-11/12 max-w-md p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-black font-extrabold text-xl border-2 border-black bg-red-400 rounded-full w-8 h-8 flex items-center justify-center shadow-[2px_2px_0px_black] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_black] active:translate-y-[1px] active:shadow-none transition"
        >
          ✕
        </button>

        {/* Name */}
        <h2 className="text-4xl font-extrabold capitalize text-center mb-6 border-4 border-black bg-yellow-300 px-4 py-2 rounded-xl shadow-[4px_4px_0px_black]">
          {pokemon.name}
        </h2>

        {/* Images */}
        <div className="flex justify-center gap-8 mb-6">
          <img
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            className="w-32 h-40 object-contain drop-shadow-[3px_3px_0px_black]"
          />
          <img
            src={
              pokemon.sprites.other["official-artwork"].front_shiny ||
              pokemon.sprites.front_shiny
            }
            alt={`${pokemon.name} shiny`}
            className="w-32 h-40 object-contain drop-shadow-[3px_3px_0px_black]"
          />
        </div>

        {/* Types */}
        <div className="flex gap-3 mb-6 justify-center flex-wrap">
          {pokemon.types.map((t, i) => (
            <span
              key={i}
              className="px-4 py-1 rounded-full font-bold text-sm border-2 border-black bg-yellow-400 shadow-[2px_2px_0px_black]"
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Abilities */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <h2 className="text-lg font-extrabold text-black">Abilities:</h2>
          {pokemon.abilities.map((a, i) => (
            <span
              key={i}
              className="px-4 py-1 rounded-full text-sm font-bold border-2 border-black bg-purple-400 text-black shadow-[2px_2px_0px_black]"
            >
              {a.ability.name}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 text-lg font-bold mb-6">
          <div className="px-4 py-2 rounded-xl border-2 border-black bg-white shadow-[3px_3px_0px_black]">
            Height: {pokemon.height}
          </div>
          <div className="px-4 py-2 rounded-xl border-2 border-black bg-white shadow-[3px_3px_0px_black]">
            Weight: {pokemon.weight}
          </div>
        </div>

        {/* Catch Button */}
        <button className="w-full py-3 mt-4 bg-green-400 border-4 border-black rounded-xl shadow-[5px_5px_0px_black] text-lg font-extrabold hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_black] active:translate-y-[2px] active:shadow-none transition" onClick={()=>handleCatch(pokemon)}>
          🎯 Catch {pokemon.name}
        </button>
      </div>
    </div>
  );
}
