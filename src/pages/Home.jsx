import { useEffect, useState } from "react";
import PokemonCard from "../components/Card";
import Details from "../components/details";
import LoginButton from "../components/LoginButton";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const limit = 20;
  const fetchLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/isLoggedIn", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error:", err);
      navigate("/login");
    }
  };
  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await res.json();
      setPokemons((prev) => [...prev, ...data.results]);
      setOffset((prev) => prev + limit);
    } catch (err) {
      console.log("Error fetching Pokémon:", err);
    }
    setLoading(false);
  };
  async function fetchUser() {
    try {
      const res = await fetch("http://localhost:3000/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Error:", err);
      navigate("/login");
    }
  }
  useEffect(() => {
    fetchLogin();
    fetchPokemons();
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50 flex flex-col items-center py-12 text-black relative overflow-hidden">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-black border-4 border-black bg-yellow-300 px-6 py-2 rounded-2xl shadow-[6px_6px_0px_black] tracking-wide mt-10 mb-12">
        Pokémon World
      </h1>

      {user ? (
        <div>
          <LoginButton user={user} />
          <button className="absolute top-6 right-40 px-6 py-2 rounded-2xl bg-yellow-400 text-black font-bold border-2 border-black shadow-[3px_3px_0px_black] hover:translate-y-[-3px] hover:shadow-[5px_5px_0px_black] active:translate-y-[2px] active:shadow-none transition-all" onClick={() => navigate("/cought")}>
            Cought Pokemons
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="mb-6 px-6 py-2 rounded-xl bg-yellow-400 text-black font-bold border-2 border-black shadow-[3px_3px_0px_black] hover:translate-y-1 hover:shadow-[1px_1px_0px_black] transition absolute right-10"
        >
          Login
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-6">
        {pokemons.map((p, i) => (
          <PokemonCard key={i} name={p.name} onSelect={setSelected} />
        ))}
      </div>

      {/* Load More button */}
      <button
        onClick={fetchPokemons}
        className="mt-12 px-8 py-3 rounded-2xl bg-red-400 text-black font-extrabold border-4 border-black shadow-[5px_5px_0px_black] hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_black] active:translate-y-[2px] active:shadow-none transition-all"
        disabled={loading}
      >
        {loading ? "Loading..." : "Load More"}
      </button>

      {/* Details modal */}
      {selected && (
        <Details
          isOpen={selected ? true : false}
          pokemon={selected}
          handleClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
