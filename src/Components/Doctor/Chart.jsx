import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useChartData, usePatientById } from "src/Hooks/DoctorHooks.js";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { useGraphMeasurements } from "src/Hooks/Hooks.js";

export const Chart = ({ indicator = "wfh" }) => {
  const { id } = useParams();
  const { data: patient, isLoading: patientLoading } = usePatientById(id);
  const [chartData, setChartData] = useState([]);
  const { data: childMeasurements, isLoading: measurementsLoading } =
    useGraphMeasurements(id);
  const [yAxisLabel, setYAxisLabel] = useState("Weight (kg)");
  const [xAxisLabel, setXAxisLabel] = useState("Length (cm)");
  const [chartDimensions, setChartDimensions] = useState({
    fontSize: 12,
    padding: 20,
  });
  const [childData, setChildData] = useState([]);

  // Responsive dimensions calculation
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setChartDimensions({
        fontSize: width < 640 ? 10 : width < 1024 ? 12 : 14,
        padding: width < 640 ? 12 : width < 1024 ? 16 : 20,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Rest of your existing helper functions...
  const calculateAgeInMonths = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const ageInMonths =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      (today.getMonth() - birthDate.getMonth());
    return ageInMonths;
  };

  const ageInMonths = patient?.date_of_birth
    ? calculateAgeInMonths(patient.date_of_birth)
    : null;
  const genderInitial = patient?.gender?.charAt(0).toLowerCase();

  const { data: rawData, isLoading } = useChartData(ageInMonths, genderInitial);

  useEffect(() => {
    if (rawData && rawData[indicator]) {
      setChartData(rawData[indicator]);
      updateAxisLabels(indicator);
    }
  }, [rawData, indicator]);

  // Data processing for childMeasurements
  useEffect(() => {
    if (childMeasurements && childMeasurements[indicator]) {
      const formattedChildData = childMeasurements[indicator].map((item) => {
        const xKey = indicator === "wfh" ? "height" : "month";
        const yKey =
          indicator === "hfa"
            ? "height"
            : indicator === "wfa"
              ? "weight"
              : indicator === "hcfa"
                ? "head_circumference"
                : indicator === "bmi"
                  ? "bmi"
                  : "weight";

        return {
          [indicator === "wfh" ? "Length" : "Month"]: item[xKey],
          y: item[yKey],
        };
      });
      setChildData(formattedChildData);
    }
  }, [childMeasurements, indicator]);

  const updateAxisLabels = (ind) => {
    switch (ind) {
      case "hfa":
        setYAxisLabel("Height (cm)");
        setXAxisLabel("Age (months)");
        break;
      case "wfa":
        setYAxisLabel("Weight (kg)");
        setXAxisLabel("Age (months)");
        break;
      case "wfh":
        setYAxisLabel("Weight (kg)");
        setXAxisLabel("Height (cm)");
        break;
      case "bmi":
        setYAxisLabel("BMI");
        setXAxisLabel("Age (months)");
        break;
      case "hcfa":
        setYAxisLabel("Head Circumference (cm)");
        setXAxisLabel("Age (months)");
        break;
      default:
        setYAxisLabel("Value");
        setXAxisLabel("Measurement");
    }
  };

  const getMinMaxValues = (data, childData) => {
    if ((!data || !data.length) && (!childData || !childData.length))
      return { min: 0, max: 32 };
    let min = Infinity;
    let max = -Infinity;
    const processItem = (item) => {
      const values = [
        "SD3neg",
        "SD2neg",
        "SD1neg",
        "SD0",
        "SD1",
        "SD2",
        "SD3",
        "y",
      ];
      values.forEach((key) => {
        if (item[key] !== undefined) {
          if (item[key] < min) min = item[key];
          if (item[key] > max) max = item[key];
        }
      });
    };
    data.forEach(processItem);
    childData.forEach(processItem);
    const padding = (max - min) * 0.05;
    return {
      min: Math.max(0, Math.floor(min - padding)),
      max: Math.ceil(max + padding),
    };
  };

  const getXAxisDomain = () => {
    const xValues = [...chartData, ...childData].map(
      (item) => item[indicator === "wfh" ? "Length" : "Month"],
    );
    return [Math.min(...xValues), Math.max(...xValues)];
  };

  if (!indicator) {
    return <div>An indicator is required to plot the graph!</div>;
  }

  const { min, max } = getMinMaxValues(chartData, childData);
  const xAxisDomain = getXAxisDomain();

  return (
    <div className="w-full h-[450px] p-2">
      {isLoading || patientLoading || measurementsLoading ? (
        <div className="flex h-full w-full justify-center items-center">
          <ClipLoader />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: chartDimensions.padding,
              right: chartDimensions.padding * 1.5,
              left: chartDimensions.padding,
              bottom: chartDimensions.padding,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey={indicator === "wfh" ? "Length" : "Month"}
              type="number"
              domain={xAxisDomain}
              allowDataOverflow={true}
              label={{
                value: xAxisLabel,
                position: "bottom",
                offset: 0,
                fontSize: chartDimensions.fontSize,
                fill: "#4b5563",
              }}
              tick={{
                fill: "#6b7280",
                fontSize: chartDimensions.fontSize * 0.9,
                dy: chartDimensions.padding * 0.2,
              }}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
            />
            <YAxis
              domain={[min, max]}
              type="number"
              label={{
                value: yAxisLabel,
                angle: -90,
                fontSize: chartDimensions.fontSize,
                fill: "#4b5563",
                dx: -chartDimensions.padding * 1.5,
              }}
              tick={{
                fill: "#6b7280",
                fontSize: chartDimensions.fontSize * 0.9,
                dx: -chartDimensions.padding * 0.2,
              }}
              allowDataOverflow={true}
              width={chartDimensions.padding * 3}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                padding: `${chartDimensions.padding * 0.4}px`,
                fontSize: `${chartDimensions.fontSize}px`,
              }}
              formatter={(value, name, props) => [
                `${value.toFixed(2)} ${yAxisLabel.split(" ")[1]?.replace("(", "")?.replace(")", "")}`,
                name,
              ]}
              labelFormatter={(label) =>
                `${xAxisLabel.split(" ")[0]}: ${label}`
              }
            />
            <Legend
              verticalAlign="bottom"
              height={chartDimensions.padding * 1.8}
              wrapperStyle={{
                paddingTop: `${chartDimensions.padding * 2}px`,
                fontSize: `${chartDimensions.fontSize}px`,
              }}
            />

            {childData.map((point, index) => (
              <Line
                key={index}
                data={[point]}
                type="monotone"
                dataKey="y"
                stroke="#22c55e"
                strokeWidth={0}
                dot={{
                  r: 8,
                  fill: "#22c55e",
                  strokeWidth: 2,
                  stroke: "#ffffff",
                }}
                name={index === 0 ? "Child Data" : ""}
                isAnimationActive={false}
              />
            ))}

            <Line
              type="monotone"
              dataKey="SD3neg"
              stroke="#dc2626"
              strokeWidth={chartDimensions.fontSize * 0.17}
              dot={false}
              name="-3 SD (Severe)"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="SD2neg"
              stroke="#ef4444"
              strokeWidth={chartDimensions.fontSize * 0.13}
              dot={false}
              name="-2 SD (Moderate)"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="SD1neg"
              stroke="#fca5a5"
              strokeWidth={chartDimensions.fontSize * 0.08}
              dot={false}
              name="-1 SD (Normal)"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="SD0"
              stroke="#111827"
              strokeWidth={chartDimensions.fontSize * 0.21}
              dot={false}
              name="Median (Normal)"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="SD1"
              stroke="#93c5fd"
              strokeWidth={chartDimensions.fontSize * 0.08}
              dot={false}
              name="+1 SD (Normal)"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="SD2"
              stroke="#3b82f6"
              strokeWidth={chartDimensions.fontSize * 0.13}
              dot={false}
              name="+2 SD (Overweight)"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="SD3"
              stroke="#1d4ed8"
              strokeWidth={chartDimensions.fontSize * 0.17}
              dot={false}
              name="+3 SD (Obese)"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
