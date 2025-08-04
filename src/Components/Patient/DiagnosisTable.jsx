import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { useDiagnoseHistory } from "src/Hooks/DoctorHooks.js";
import { ClipLoader } from "react-spinners";
import { motion } from "motion/react";
import { FaStethoscope, FaExclamationTriangle } from "react-icons/fa";

const DiagnosisTable = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const {
    data: diagnosisRecords,
    isLoading,
    isError,
    refetch,
  } = useDiagnoseHistory(id, page);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  useEffect(() => {
    if (isError) {
      setError(true);
    }
  }, [isError]);

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
      "Weight-For-Height": {
        Normal: "text-green-600",
        "Possible risk of overweight": "text-yellow-500",
        Overweight: "text-orange-500",
        Obese: "text-red-600",
        Wasted: "text-orange-500",
        "Severely wasted": "text-red-600",
      },
      "Head-Circumference-for-Age": {
        Normal: "text-green-600",
        Macrocephaly: "text-orange-500",
        "Severe macrocephaly": "text-red-600",
        Microcephaly: "text-orange-500",
        "Severe microcephaly": "text-red-600",
      },
    };

    return classes[type]?.[value] || "text-gray-600";
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr || 'N/A';
    }
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      cell: (row) => <div className="py-2">{formatDate(row.date)}</div>,
    },
    {
      name: "Month",
      selector: (row) => row.month,
      sortable: true,
      cell: (row) => <div className="py-2">{typeof row.month === 'number' ? row.month.toFixed(2) : 'N/A'}</div>,
    },
    {
      name: "Height-for-Age",
      selector: (row) => row.diagnosis?.height_for_age,
      sortable: true,
      cell: (row) => (
        <div className="py-2">
          <span className={`${getClassForDiagnosis(row.diagnosis?.height_for_age, "Height-for-Age")} font-medium`}>
            {row.diagnosis?.height_for_age || 'N/A'}
          </span>
        </div>
      ),
    },
    {
      name: "Weight-for-Age",
      selector: (row) => row.diagnosis?.weight_for_age,
      sortable: true,
      cell: (row) => (
        <div className="py-2">
          <span className={`${getClassForDiagnosis(row.diagnosis?.weight_for_age, "Weight-for-Age")} font-medium`}>
            {row.diagnosis?.weight_for_age || 'N/A'}
          </span>
        </div>
      ),
    },
    {
      name: "BMI-for-Age",
      selector: (row) => row.diagnosis?.bmi_for_age,
      sortable: true,
      cell: (row) => (
        <div className="py-2">
          <span className={`${getClassForDiagnosis(row.diagnosis?.bmi_for_age, "BMI-for-Age")} font-medium`}>
            {row.diagnosis?.bmi_for_age || 'N/A'}
          </span>
        </div>
      ),
    },
    {
      name: "Head-Circumference",
      selector: (row) => row.diagnosis?.head_circumference_for_age,
      sortable: true,
      cell: (row) => (
        <div className="py-2">
          <span className={`${getClassForDiagnosis(row.diagnosis?.head_circumference_for_age, "Head-Circumference-for-Age")} font-medium`}>
            {row.diagnosis?.head_circumference_for_age || 'N/A'}
          </span>
        </div>
      ),
    },
    {
      name: "Weight-For-Height",
      selector: (row) => row.diagnosis?.weight_for_height,
      sortable: true,
      cell: (row) => (
        <div className="py-2">
          <span className={`${getClassForDiagnosis(row.diagnosis?.weight_for_height, "Weight-For-Height")} font-medium`}>
            {row.diagnosis?.weight_for_height || 'N/A'}
          </span>
        </div>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f8fafc",
        border: "none",
        fontSize: "14px",
        fontWeight: "500",
        color: "#374151",
      },
    },
    headCells: {
      style: {
        padding: "16px",
        fontWeight: "500",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        backgroundColor: "#fff",
        border: "none",
        borderBottom: "1px solid #f1f5f9",
        "&:last-of-type": {
          borderBottom: "none",
        },
        "&:hover": {
          backgroundColor: "#f8fafc",
        },
      },
    },
    cells: {
      style: {
        padding: "8px 16px",
      },
    },
    pagination: {
      style: {
        borderTop: "1px solid #f1f5f9",
        backgroundColor: "#fff",
      },
      pageButtonsStyle: {
        color: "#3b82f6",
        fill: "#3b82f6",
        "&:disabled": {
          color: "#cbd5e1",
          fill: "#cbd5e1",
        },
        "&:hover:not(:disabled)": {
          backgroundColor: "#eff6ff",
        },
        "&:focus": {
          outline: "none",
        },
      },
    },
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="bg-primary-blue/5 px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-light text-gray-800 flex items-center">
          <FaStethoscope className="mr-2 text-primary-blue" />
          Diagnosis Records
        </h2>
      </div>
      
      <div className="p-4">
        {error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-red-50 p-4 mb-4">
              <FaExclamationTriangle className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-lg font-light text-gray-800 mb-2">Unable to Load Records</h3>
            <p className="text-gray-600 mb-4 max-w-md">
              We couldn't load the diagnosis records. Please try again later.
            </p>
            <button 
              onClick={() => {
                setError(false);
                refetch();
              }}
              className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <ClipLoader size={40} color="#3b82f6" />
            <p className="mt-4 text-gray-600 font-light">Loading diagnosis records...</p>
          </div>
        ) : diagnosisRecords?.diagnosis_history?.length > 0 ? (
          <DataTable
            columns={columns}
            data={diagnosisRecords.diagnosis_history}
            pagination
            paginationServer
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
            paginationTotalRows={diagnosisRecords?.total_records || 0}
            paginationPerPage={diagnosisRecords?.page_size || 10}
            paginationDefaultPage={diagnosisRecords?.current_page || 1}
            onChangePage={handlePageChange}
            fixedHeader
            responsive
            customStyles={customStyles}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-blue-50 p-4 mb-4">
              <FaStethoscope className="text-primary-blue text-2xl" />
            </div>
            <h3 className="text-lg font-light text-gray-800 mb-2">No Diagnosis Records</h3>
            <p className="text-gray-600 max-w-md">
              There are no diagnosis records available for this child yet.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DiagnosisTable;
