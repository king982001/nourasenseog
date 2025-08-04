import React, { useState, useEffect, useCallback } from "react";
import Search from "src/assets/Doctor/Search.svg";
import {
  useCreateDietPlan,
  useFoodSearch,
  usePatientById,
} from "src/Hooks/DoctorHooks.js";
import { X, Loader2, Check } from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const DietPlan = () => {
  const { id } = useParams();
  const {
    data: childData,
    isLoading: isLoadingPatient,
    error: patientError,
  } = usePatientById(id);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dietPlan, setDietPlan] = useState(null);
  const [selectedSearchItems, setSelectedSearchItems] = useState([]);
  const { mutate: searchFoodItems, isLoading: isSearching } = useFoodSearch();
  const { mutate: createDietPlan, isLoading: isGenerating } =
    useCreateDietPlan();

  const calculateAgeInMonths = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const now = new Date();

    if (isNaN(dob.getTime())) {
      throw new Error("Invalid date of birth.");
    }

    const years = now.getFullYear() - dob.getFullYear();
    const months = now.getMonth() - dob.getMonth();
    const totalMonths = years * 12 + months;
    const dayDifference = now.getDate() - dob.getDate();
    return totalMonths - (dayDifference < 0 ? 1 : 0);
  };

  const debouncedSearch = useCallback(
    (value) => {
      if (value.trim()) {
        searchFoodItems(value, {
          onSuccess: (res) => {
            setSearchResults(res);
          },
          onError: (error) => {
            toast.error("Failed to search food items. Please try again.");
          },
        });
      } else {
        setSearchResults([]);
      }
    },
    [searchFoodItems],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  const toggleSelectSearchItem = (item) => {
    setSelectedSearchItems(prevItems =>
      prevItems.includes(item)
        ? prevItems.filter(i => i !== item)
        : [...prevItems, item]
    );
  };

  const handleAddSelectedItems = () => {
    const newItems = selectedSearchItems.filter(item => !selectedItems.includes(item));
    if (newItems.length > 0) {
      setSelectedItems([...selectedItems, ...newItems]);
    }
    setSelectedSearchItems([]);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
  };

  const handleCreateDietPlan = () => {
    const child_age = calculateAgeInMonths(childData?.date_of_birth);
    const child_gender = childData?.gender.charAt(0).toLowerCase();
    // Get the logged-in doctor information from localStorage
    const doctorAccount = JSON.parse(localStorage.getItem("DoctorAccount") || "{}");

    const data = {
      food_choices: selectedItems,
      child_age,
      child_gender,
      user_id: doctorAccount.id || doctorAccount._id,
    };

    toast.promise(
      new Promise((resolve, reject) => {
        createDietPlan(data, {
          onSuccess: (res) => {
            setDietPlan(res);
            resolve(res);
          },
          onError: (error) => {
            reject(error);
          },
        });
      }),
      {
        loading: "Generating diet plan...",
        success: "Diet plan generated successfully!",
        error: "Failed to generate diet plan",
      },
    );
  };

  if (isLoadingPatient) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 w-full flex flex-col justify-center items-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-gray-400 animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 font-light">Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (patientError) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 w-full">
        <div className="text-center py-6">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error Loading Patient Data</h3>
          <p className="mt-1 text-sm text-gray-500">Please try again later or contact support if the issue persists.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm mb-6">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-xl font-light text-gray-800">Create Diet Plan</h2>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-sm text-gray-500">
          Search and select at least 3 food items to create a customized diet plan
        </p>

        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <div className="flex items-center p-3 px-4 border border-gray-300 rounded-lg bg-white cursor-text w-full shadow-sm hover:border-gray-400 focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 transition-colors">
            <img
              className="h-5 w-5 text-gray-400"
              src={Search}
              alt="Search Icon"
            />
            <input
              type="text"
              value={searchQuery}
              placeholder="Search food items..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm outline-none px-3 !mt-0 !border-none bg-transparent placeholder-gray-400"
            />
            {isSearching && (
              <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && searchQuery && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
              <ul className="max-h-60 overflow-auto py-1 divide-y divide-gray-100">
                {searchResults.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 transition-colors flex items-center justify-between"
                    onClick={() => toggleSelectSearchItem(item)}
                  >
                    <span>{item}</span>
                    {selectedSearchItems.includes(item) && (
                      <Check size={16} className="text-green-500" />
                    )}
                  </li>
                ))}
              </ul>
              {selectedSearchItems.length > 0 && (
                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={handleAddSelectedItems}
                    className="w-full py-2 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors"
                  >
                    Add Selected Items ({selectedSearchItems.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Items */}
        <div className="max-w-2xl mx-auto mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-medium text-gray-800">Selected Items</h3>
            <span className="text-sm text-gray-500">{selectedItems.length} of 3 required</span>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-gray-50 rounded-lg border border-gray-200">
            {selectedItems.length === 0 ? (
              <p className="text-gray-400 text-sm w-full text-center my-auto">
                No items selected yet
              </p>
            ) : (
              selectedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex text-sm items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg h-fit border border-gray-200 hover:bg-gray-200 transition-colors"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Create Diet Plan Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleCreateDietPlan}
            disabled={selectedItems.length < 3 || isGenerating}
            className="px-6 py-2.5 bg-gray-800 text-white font-medium rounded-lg shadow-sm hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isGenerating && <Loader2 className="w-4 h-4 animate-spin" />}
            {isGenerating ? "Generating..." : "Create Diet Plan"}
          </button>
        </div>

        {/* Diet Plan Results */}
        {dietPlan && (
          <div className="mt-8 space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Diet Plan Results</h3>

              {/* Daily Intakes */}
              <div className="space-y-3 mb-6">
                <h4 className="text-base font-medium text-gray-700">Daily Food Portions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(dietPlan.daily_intakes).map(
                    ([food, amount]) => (
                      <div key={food} className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                        <p className="text-sm text-gray-700">{food}</p>
                        <p className="text-sm font-medium text-gray-900">{amount}g</p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Calories */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-700">Total Daily Calories</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {dietPlan.calories} kcal
                  </p>
                </div>
              </div>

              {/* Nutrient Analysis */}
              <div className="space-y-3">
                <h4 className="text-base font-medium text-gray-700">Nutrient Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(dietPlan.nutrient_analysis).map(
                    ([nutrient, data]) => (
                      <div
                        key={nutrient}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-gray-700">{nutrient}</p>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${data.percent_dri > 100
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                              }`}
                          >
                            {data.percent_dri}% of daily value
                          </span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between text-gray-600">
                            <span>Recommended</span>
                            <span>{data.recommended}g</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Actual</span>
                            <span>{data.actual}g</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${data.percent_dri > 100 ? "bg-yellow-500" : "bg-green-500"}`}
                              style={{
                                width: `${Math.min(data.percent_dri, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietPlan;
