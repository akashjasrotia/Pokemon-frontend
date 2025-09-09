import React from 'react'
export default function LoginButton({user}) {
  return (
     <button
            className="absolute top-6 right-10 px-6 py-2 rounded-2xl bg-yellow-400 text-black font-bold border-2 border-black shadow-[3px_3px_0px_black] hover:translate-y-[-3px] hover:shadow-[5px_5px_0px_black] active:translate-y-[2px] active:shadow-none transition-all"
          >
            {user.username}
          </button>
  )
}
