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
    newSearchParams.delete("query"); 

    setSearchParams(newSearchParams);
  };
  return (
    <form onSubmit={handleFormSubmit} className="flex items-center">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlassIcon className="text-[#757D8A] h-5 w-5" />
        </span>
        <input
          className="w-full border-[#B0B0B0] text-black text-md py-2 pl-12 pr-6 bg-white  focus:ring-0 focus:border-primary rounded-sm placeholder-[#9E9E9E]"
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
            <XMarkIcon className="text-stone-400 h-4 w-4 stroke-[3] hover:text-stone-500" />
          </span>
        )}
      </div>
      <div className="ml-2">
        <button
          type="submit"
          className="px-4 py-2 button bg-gray-300 hover:bg-gray-400 hover-transition border-gray-400"
        >
          <span className="text-[#404D61] font-normal text-md">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
