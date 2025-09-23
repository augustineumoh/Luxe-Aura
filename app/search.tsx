import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";

function SearchToggle() {
  const [showInput, setShowInput] = useState(false);
  const [query, setQuery] = useState("");

  const handleToggle = () => setShowInput(prev => !prev);

  return (
    <div className="flex items-center space-x-2">
      {/* Search Icon */}
      <button onClick={handleToggle} className="text-rose-900 font-extrabold">
        <IoIosSearch  size={19} />
      </button>

      {/* Conditional Input Field */}
      {showInput && (
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-300"
        />
      )}
    </div>
  );
}

export default SearchToggle;