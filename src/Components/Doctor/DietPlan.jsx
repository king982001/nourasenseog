import React, { useState, useEffect, useCallback } from "react";
import Search from "src/assets/Doctor/Search.svg";
import {
  useCreateDietPlan,
  useFoodSearch,
  usePatientById,
} from "src/Hooks/DoctorHooks.js";
import { X, Loader2 } from "lucide-react";
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

  const handleSelectItem = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
  };

  const handleCreateDietPlan = () => {
    const child_age = calculateAgeInMonths(childData?.date_of_birth);
    const child_gender = childData?.gender.charAt(0).toLowerCase();
    const data = {
      food_choices: selectedItems,
      child_age,
      child_gender,
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
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
      </div>
    );
  }

  if (patientError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">
          Failed to load patient data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mt-12 mx-auto p-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-2xl font-semibold text-gray-900">
          Create Diet Plan
        </h1>
        <p className="font-sans text-sm text-gray-600">
          Search and select food items to create a customized diet plan
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <div className="input flex items-center p-3 px-4 border border-gray-300 rounded-lg bg-white cursor-text w-full shadow-sm hover:border-primary-blue focus-within:border-primary-blue focus-within:ring-1 focus-within:ring-primary-blue transition-colors">
          <img
            className="h-5 w-5 text-gray-400"
            src={Search}
            alt="Search Icon"
          />
          <input
            type="text"
            value={searchQuery}
            placeholder="Search food items(Min. 10 items needs to be selected)"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm font-sans outline-none px-3 !mt-0 !border-none bg-transparent placeholder-gray-400"
          />
          {isSearching && (
            <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
          )}
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && searchQuery && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul className="max-h-60 overflow-auto py-1">
              {searchResults.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer font-sans text-sm text-gray-700 transition-colors"
                  onClick={() => handleSelectItem(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Selected Items */}
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-lg font-medium text-gray-900 mb-4">
          Selected Items
        </h2>
        <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-gray-50 rounded-lg border border-gray-200">
          {selectedItems.length === 0 ? (
            <p className="text-gray-400 font-sans text-sm w-full text-center my-auto">
              No items selected yet
            </p>
          ) : (
            selectedItems.map((item, index) => (
              <div
                key={index}
                className="flex text-sm items-center gap-2 px-3 py-1.5 bg-primary-blue/10 text-primary-blue rounded-lg h-fit font-sans border border-primary-blue/20"
              >
                <span>{item}</span>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="hover:text-primary-blue/70 transition-colors"
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
          disabled={selectedItems.length < 10 || isGenerating}
          className="px-6 py-2.5 bg-primary-blue text-white font-sans font-medium rounded-lg shadow-sm hover:bg-primary-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isGenerating && <Loader2 className="w-4 h-4 animate-spin" />}
          {isGenerating ? "Generating..." : "Create Diet Plan"}
        </button>
      </div>

      {/* Diet Plan Results */}
      {dietPlan && (
        <div className="max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-gray-900">
              Diet Plan Results
            </h2>

            {/* Daily Intakes */}
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-medium text-gray-800">
                Daily Food Portions (g)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(dietPlan.daily_intakes).map(
                  ([food, amount]) => (
                    <div key={food} className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">{food}</p>
                      <p className="text-primary-blue font-medium">{amount}g</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Calories */}
            <div className="bg-primary-blue/10 p-4 rounded-lg">
              <p className="font-medium text-gray-900">Total Calories</p>
              <p className="text-primary-blue text-2xl font-bold">
                {dietPlan.calories} kcal
              </p>
            </div>

            {/* Nutrient Analysis */}
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-medium text-gray-800">
                Nutrient Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(dietPlan.nutrient_analysis).map(
                  ([nutrient, data]) => (
                    <div
                      key={nutrient}
                      className="p-4 bg-gray-50 rounded-lg space-y-2"
                    >
                      <p className="font-medium text-gray-900">{nutrient}</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">
                          Recommended: {data.recommended}g
                        </p>
                        <p className="text-gray-600">Actual: {data.actual}g</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${data.percent_dri > 100 ? "bg-yellow-500" : "bg-green-500"}`}
                              style={{
                                width: `${Math.min(data.percent_dri, 200)}%`,
                              }}
                            />
                          </div>
                          <span
                            className={`font-medium ${data.percent_dri > 100 ? "text-yellow-600" : "text-green-600"}`}
                          >
                            {data.percent_dri}%
                          </span>
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
  );
};

export default DietPlan;
