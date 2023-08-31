import React, { useState, useCallback, useEffect, useRef } from "react";

const PasswordGenrator = () => {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const passwordRef = useRef(null);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const PasswordGenrator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) str += "0123456789";

    if (characters) str += "`~@#$%^&*()-_+=|[]{};:/?.>,<|";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbers, characters, setPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    PasswordGenrator();
  }, [length, numbers, characters, PasswordGenrator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
      <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          readOnly
          ref={passwordRef}
          placeholder="password"
        />

        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0.5"
          onClick={copyToClipBoard}
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2 ">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />

          <label>Length{length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numbers}
            id="numberinput"
            onChange={() => {
              setNumbers((prev) => !prev);
            }}
          />

          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={characters}
            id="charachterInput"
            onChange={() => {
              setCharacters((prev) => !prev);
            }}
          />

          <label htmlFor="charchterInput">Charachters</label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenrator;
