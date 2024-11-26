import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { useDiagnoseHistory } from "../../Hooks/DoctorHooks.js";

const DiagnosisTable = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const { data: diagnosisRecords, isLoading: loading } = useDiagnoseHistory(id);

  const getClassForDiagnosis = (value, type) => {
    const classes = {
      "Height-for-Age": {
        Normal: "text-green-600",
        "Normal but might indicate an endocrine disorder": "text-yellow-500",
        Stunted: "text-orange-500",
        "Severely stunted": "text-red-600",
      },
      "Weight-for-Age": {
        Normal: "text-green-600",
        "Possible risk of growth problem": "text-yellow-500",
        Underweight: "text-orange-500",
        "Severely underweight": "text-red-600",
      },
      "BMI-for-Age": {
        Normal: "text-green-600",
        "Possible risk of overweight": "text-yellow-500",
        Overweight: "text-orange-500",
        Obese: "text-red-600",
        Wasted: "text-orange-500",
        "Severely wasted": "text-red-600",
      },
    };

    return classes[type]?.[value] || "text-gray-600"; // Default class
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Month",
      selector: (row) => row.month.toFixed(2), // Formatting month value
      sortable: true,
    },
    {
      name: "Height-for-Age",
      selector: (row) => (
        <span
          className={`${getClassForDiagnosis(row.diagnosis.height_for_age, "Height-for-Age")} font-semibold`}
        >
          {row.diagnosis.height_for_age}
        </span>
      ),
    },
    {
      name: "Weight-for-Age",
      selector: (row) => (
        <span
          className={`${getClassForDiagnosis(row.diagnosis.weight_for_age, "Weight-for-Age")} font-semibold`}
        >
          {row.diagnosis.weight_for_age}
        </span>
      ),
    },
    {
      name: "BMI-for-Age",
      selector: (row) => (
        <span
          className={`${getClassForDiagnosis(row.diagnosis.bmi_for_age, "BMI-for-Age")} font-semibold`}
        >
          {row.diagnosis.bmi_for_age}
        </span>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        textAlign: "center",
      },
    },
    cells: {
      style: {
        textAlign: "center",
        whiteSpace: "normal", // Allows text to wrap to the next line
      },
    },
  };

  return (
    <div className={"flex flex-col gap-y-5"}>
      <h1 className="font-serif text-xl font-semibold text-center">
        Diagnosis Records
      </h1>
      {error && (
        <div className="flex justify-center items-center">No data found!</div>
      )}
      {loading && (
        <div className="flex justify-center items-center">Loading...</div>
      )}
      {!loading && !error && (
        <DataTable
          columns={columns}
          data={diagnosisRecords?.diagnosis_history}
          fixedHeader
          responsive
          pointerOnHover
          customStyles={customStyles}
        />
      )}
    </div>
  );
};

export default DiagnosisTable;
