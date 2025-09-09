import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const cardRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch("https://pokemon-backend-x7br.onrender.com/isLoggedIn", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then(async (res) => {
      if (res.ok) navigate("/");
    });
  }, [navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(
        cardRef.current,
        { y: 10 },
        {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease:'sine.inOut'
        }
      );
    })
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://pokemon-backend-x7br.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Login successful! Welcome back to the Pokémon world!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400">
      <div
        ref={cardRef}
        className="relative w-full max-w-md bg-white rounded-3xl border-4 border-yellow-600 shadow-[6px_6px_0px_black] p-8"
      >
        <h1 className="text-3xl font-extrabold text-center text-yellow-600 mb-6 drop-shadow-[2px_2px_0px_black]">
          Welcome Back, Trainer!
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border-2 border-black focus:ring-2 focus:ring-yellow-500 outline-none bg-yellow-50"
              placeholder="trainer@poke.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border-2 border-black focus:ring-2 focus:ring-yellow-500 outline-none bg-yellow-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-yellow-400 text-black font-extrabold text-lg border-2 border-black shadow-[4px_4px_0px_black] hover:translate-y-1 hover:shadow-[2px_2px_0px_black] transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-black">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-yellow-700 font-bold underline"
          >
            Sign Up
          </button>
        </p>

        <div className="absolute -top-6 -left-6 w-14 h-14 bg-yellow-400 border-4 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_black]">
          ⚡
        </div>
      </div>
    </div>
  );
}

