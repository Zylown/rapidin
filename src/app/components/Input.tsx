import React from "react";
import { InputProps } from "../types/inputTypes";

export default function Input({
  placeholder,
  onChange,
  inputSearch,
}: InputProps) {
  return (
    <input
      className="w-full bg-slate-300 px-4 py-2 rounded-xl outline-none placeholder:text-lg"
      placeholder={placeholder}
      onChange={onChange}
      value={inputSearch}
    ></input>
  );
}

//export default function Input(props: InputProps) también está bien
