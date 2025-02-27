import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchInput = ({ searchValue }) => {
  const [searchQuery, setSearchQuery] = useState(searchValue || "");

  const [searchParams, setSearchParams] = useSearchParams();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newSearchParams = new URLSearchParams(searchParams);

    if (searchQuery !== "") {
      newSearchParams.set("query", searchQuery);
    } else {
      newSearchParams.delete("query");
    }

    setSearchParams(newSearchParams);
  };

  const handleQueryReset = () => {
    setSearchQuery("");

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("query"); // Remove the "query" parameter

    setSearchParams(newSearchParams);
  };
  return (
    <form onSubmit={handleFormSubmit} className="flex items-center">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlassIcon className="text-amber-500 h-5 w-5" />
        </span>
        <input
          className="w-full text-black text-md py-2 pl-12 pr-6 bg-white  focus:ring-0 focus:border-inherit rounded-sm"
          type="text"
          value={searchQuery}
          placeholder="Name or Email"
          onChange={(e) => setSearchQuery(e.target.value)}
          maxLength={200}
        />
        {searchQuery.length > 0 && (
          <span
            className="absolute inset-y-0 right-1.5 flex items-center cursor-pointer"
            onClick={handleQueryReset}
          >
            <XMarkIcon className="text-stone-300 h-4 w-4 stroke-[3] hover:text-stone-400" />
          </span>
        )}
        
      </div>
      <div className="ml-2">
          <button
            type="submit"
            className="px-8 py-2 button primary-btn"
          >
            <span className="text-white">Search</span>
          </button>
        </div>
    </form>
  );
};

export default SearchInput;
