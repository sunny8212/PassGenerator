import React, { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordInputRef = useRef(null)

  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+-="

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  useEffect(() => {
    passGenerator()
  }, [length, numberAllowed, charAllowed])

  const handleCopy = () => {
    if (passwordInputRef.current) {
      navigator.clipboard.writeText(passwordInputRef.current.value)
        .then(() => {
          alert("Password copied to clipboard!")
        })
        .catch(err => {
          alert("Failed to copy password: " + err)
        })
    }
  }

  return (
    <>
      <div className='w-full h-screen absolute bg-gradient-to-b from-[#98f4ef] via-[#6cb5c7] to-[#164f66]'>

        {/* Header Section */}
      <div className="w-full max-w-3xl mt-10 mx-auto rounded-lg shadow-xl bg-gradient-to-r from-[#fa4837] to-[#59accc] py-5 animate-fadeIn">
        <h1 className="text-4xl font-bold text-center animate-pulse">Password Generator</h1>
      </div>

      {/* Password Display Section */}
      <div className="mt-10 max-w-3xl mx-auto flex shadow-xl rounded-lg overflow-hidden bg-white p-4 transition-transform duration-500 hover:scale-105">
        <input
          type="text"
          value={password}
          ref={passwordInputRef}
          className="outline-none w-full py-2 px-4 rounded-md text-xl text-center text-gray-800 bg-gray-100 border-2 border-gray-200 focus:border-cyan-500 focus:ring focus:ring-cyan-300"
          placeholder="Generated Password"
          readOnly
        />
        <button
          className="outline-none px-6 py-2 bg-cyan-600 text-white rounded-lg shadow-md hover:bg-cyan-500 hover:shadow-lg transition-transform duration-300 hover:scale-110 ml-4"
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>

      {/* Controls Section */}
      <div className="flex justify-center space-x-6 mt-10 animate-slideIn">
        {/* Length Control */}
        <div className="flex items-center gap-x-3">
          <label className=" text-lg">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer accent-cyan-600"
            onChange={(e) => { setLength(e.target.value) }}
          />
        </div>

        {/* Numbers Control */}
        <div className="flex items-center gap-x-3">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => { setNumberAllowed(prev => !prev) }}
            id="numberInput"
            className="cursor-pointer accent-cyan-600"
          />
          <label className="text-lg" htmlFor="numberInput">Numbers</label>
        </div>

        {/* Characters Control */}
        <div className="flex items-center gap-x-3">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => { setCharAllowed(prev => !prev) }}
            id="charInput"
            className="cursor-pointer accent-cyan-600"
          />
          <label className="text-lg" htmlFor="charInput">Characters</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
