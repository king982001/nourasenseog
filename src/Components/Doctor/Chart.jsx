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
    useGraphMeasurements(patient?.customId);
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
      console.log('Reference Data for', indicator, ':', rawData[indicator]);
      setChartData(rawData[indicator]);
      updateAxisLabels(indicator);
    } else {
      console.log('No reference data found for', indicator);
    }
  }, [rawData, indicator]);

  // Data processing for childMeasurements
  useEffect(() => {
    if (childMeasurements && childMeasurements[indicator]) {
      console.log('Child Measurements for', indicator, ':', childMeasurements[indicator]);
      const formattedChildData = childMeasurements[indicator].map((item) => {
        const xKey = indicator === "wfh" ? "height" : "month";
        const yKey = indicator === "hfa" 
          ? "height" 
          : indicator === "wfa" 
            ? "weight" 
            : indicator === "bmi"
              ? "bmi"
              : indicator === "hca"
                ? "head_circumference"
                : "weight";

        const formattedPoint = {
          [indicator === "wfh" ? "Length" : "Month"]: item[xKey],
          y: item[yKey],
        };
        console.log('Formatted point:', formattedPoint);
        return formattedPoint;
      });
      setChildData(formattedChildData);
    } else {
      console.log('No child measurements found for', indicator);
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
      case "bmi":
        setYAxisLabel("BMI (kg/m²)");
        setXAxisLabel("Age (months)");
        break;
      case "hca":
        setYAxisLabel("Head Circumference (cm)");
        setXAxisLabel("Age (months)");
        break;
      case "wfh":
        setYAxisLabel("Weight (kg)");
        setXAxisLabel("Height (cm)");
        break;
      default:
        setYAxisLabel("Height (cm)");
        setXAxisLabel("Age (months)");
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
      (item) => item[indicator === "wfh" ? "Length" : "Month"]
    );
    return [Math.min(...xValues), Math.max(...xValues)];
  };

  if (!indicator) {
    return <div>An indicator is required to plot the graph!</div>;
  }

  const { min, max } = getMinMaxValues(chartData, childData);
  const xAxisDomain = getXAxisDomain();

  // Custom colors for the chart
  const chartColors = {
    grid: "#f3f4f6",
    axis: "#6b7280",
    tooltip: "#ffffff",
    tooltipBorder: "#e5e7eb",
    referenceLines: {
      SD3neg: "#ef4444",
      SD2neg: "#f97316",
      SD1neg: "#fbbf24",
      SD0: "#22c55e",
      SD1: "#fbbf24",
      SD2: "#f97316",
      SD3: "#ef4444",
    },
    childData: "#3b82f6",
  };

  return (
    <div className="w-full h-[450px] p-2">
      {isLoading || patientLoading || measurementsLoading ? (
        <div className="flex h-full w-full justify-center items-center">
          <ClipLoader color="#3b82f6" />
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
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.grid}
              vertical={false}
            />
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
                fill: chartColors.axis,
                fontWeight: 500,
              }}
              tick={{
                fill: chartColors.axis,
                fontSize: chartDimensions.fontSize * 0.9,
                dy: chartDimensions.padding * 0.2,
              }}
              axisLine={{ stroke: chartColors.axis }}
            />
            <YAxis
              domain={[min, max]}
              type="number"
              label={{
                value: yAxisLabel,
                angle: -90,
                fontSize: chartDimensions.fontSize,
                fill: chartColors.axis,
                fontWeight: 500,
                dx: -chartDimensions.padding * 1.5,
              }}
              tick={{
                fill: chartColors.axis,
                fontSize: chartDimensions.fontSize * 0.9,
                dx: -chartDimensions.padding * 0.2,
              }}
              allowDataOverflow={true}
              width={chartDimensions.padding * 3}
              axisLine={{ stroke: chartColors.axis }}
            />
            <Tooltip
              itemSorter={(item) => -item.value}
              contentStyle={{
                backgroundColor: chartColors.tooltip,
                border: `1px solid ${chartColors.tooltipBorder}`,
                borderRadius: "8px",
                padding: `${chartDimensions.padding * 0.4}px`,
                fontSize: `${chartDimensions.fontSize}px`,
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value, name, props) => {
                const unit = indicator === "bmi" 
                  ? "kg/m²" 
                  : indicator === "hcfa" 
                    ? "cm" 
                    : yAxisLabel.split(" ")[1]?.replace("(", "")?.replace(")", "");
                return [
                  <span className="font-medium">
                    {`${value.toFixed(2)} ${unit}`}
                  </span>,
                  <span className="text-gray-600">{name}</span>,
                ];
              }}
              labelFormatter={(label) => (
                <span className="font-medium text-gray-800">
                  {`${xAxisLabel.split(" ")[0]}: ${label}`}
                </span>
              )}
            />
            <Legend
              verticalAlign="bottom"
              height={chartDimensions.padding * 1.8}
              wrapperStyle={{
                paddingTop: `${chartDimensions.padding * 2}px`,
                fontSize: `${chartDimensions.fontSize}px`,
              }}
              iconType="circle"
              iconSize={8}
            />

            {/* Reference Lines */}
            <Line
              type="monotone"
              dataKey="SD3neg"
              stroke={chartColors.referenceLines.SD3neg}
              strokeWidth={1.5}
              dot={false}
              name="-3 SD"
            />
            <Line
              type="monotone"
              dataKey="SD2neg"
              stroke={chartColors.referenceLines.SD2neg}
              strokeWidth={1.5}
              dot={false}
              name="-2 SD"
            />
            <Line
              type="monotone"
              dataKey="SD1neg"
              stroke={chartColors.referenceLines.SD1neg}
              strokeWidth={1.5}
              dot={false}
              name="-1 SD"
            />
            <Line
              type="monotone"
              dataKey="SD0"
              stroke={chartColors.referenceLines.SD0}
              strokeWidth={1.5}
              dot={false}
              name="Median"
            />
            <Line
              type="monotone"
              dataKey="SD1"
              stroke={chartColors.referenceLines.SD1}
              strokeWidth={1.5}
              dot={false}
              name="+1 SD"
            />
            <Line
              type="monotone"
              dataKey="SD2"
              stroke={chartColors.referenceLines.SD2}
              strokeWidth={1.5}
              dot={false}
              name="+2 SD"
            />
            <Line
              type="monotone"
              dataKey="SD3"
              stroke={chartColors.referenceLines.SD3}
              strokeWidth={1.5}
              dot={false}
              name="+3 SD"
            />

            {/* Child Data Points */}
            {childData.map((point, index) => (
              <Line
                key={index}
                type="monotone"
                data={[point]}
                dataKey="y"
                stroke={chartColors.childData}
                strokeWidth={2}
                dot={{
                  fill: chartColors.childData,
                  stroke: "#ffffff",
                  strokeWidth: 2,
                  r: 6,
                }}
                name="Child's Measurements"
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
