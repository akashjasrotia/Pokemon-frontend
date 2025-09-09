import { useEffect, useState } from "react"

const typeColors = {
  grass: "bg-green-400 border-green-700",
  fire: "bg-red-400 border-red-700",
  water: "bg-blue-400 border-blue-700",
  electric: "bg-yellow-300 text-black border-yellow-600",
  psychic: "bg-pink-400 border-pink-700",
  normal: "bg-gray-400 border-gray-700",
  fighting: "bg-orange-400 border-orange-700",
  flying: "bg-indigo-400 border-indigo-700",
  poison: "bg-purple-400 border-purple-700",
  ground: "bg-amber-400 border-amber-700",
  rock: "bg-stone-400 border-stone-700",
  bug: "bg-lime-400 border-lime-700",
  ghost: "bg-indigo-500 border-indigo-800",
  dragon: "bg-purple-500 border-purple-800",
  dark: "bg-gray-700 border-gray-900",
  steel: "bg-slate-400 border-slate-700",
  ice: "bg-cyan-300 border-cyan-600",
  fairy: "bg-rose-400 border-rose-700",
}

export default function PokemonCard({ name, onSelect }) {
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data = await res.json()
        setPokemon(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [name])

  if (!pokemon) {
    return (
      <div className="w-60 aspect-[7/9] rounded-2xl bg-gray-200 border-4 border-black shadow-[6px_6px_0px_black] flex items-center justify-center animate-pulse">
        <p className="text-gray-600 font-bold">Loading...</p>
      </div>
    )
  }

  return (
    <div
      onClick={() => onSelect(pokemon)}
      className="group w-60 aspect-[7/9] flex flex-col items-center rounded-2xl bg-yellow-200 border-4 border-black shadow-[6px_6px_0px_black] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_black] active:translate-y-[2px] active:shadow-none transition-all duration-200 cursor-pointer p-4"
    >
      <div className="flex justify-center flex-grow">
        <img
          src={
            pokemon.sprites.other["official-artwork"].front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          className="w-32 h-40 object-contain drop-shadow-[2px_2px_0px_black] group-hover:scale-110 transition-transform duration-200"
        />
      </div>

      <div className="mt-3 flex flex-col items-center">
        <h2 className="text-xl font-extrabold capitalize tracking-wide text-black drop-shadow-[2px_2px_0px_white]">
          {pokemon.name}
        </h2>
        <div className="flex gap-2 mt-2 flex-wrap justify-center">
          {pokemon.types.map((t, i) => (
            <span
              key={i}
              className={`px-3 py-1 text-sm rounded-full font-bold border-2 shadow-[2px_2px_0px_black] ${
                typeColors[t.type.name] || "bg-gray-400 border-gray-700"
              }`}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
