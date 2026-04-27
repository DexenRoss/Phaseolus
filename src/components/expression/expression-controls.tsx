"use client";

import type {
  ExpressionColorScaleOption,
  ExpressionDatasetSummary,
  ExpressionLineView,
} from "@/types/expression";

type ExpressionControlsProps = {
  datasets: ExpressionDatasetSummary[];
  lineViews: ExpressionLineView[];
  colorScales: ExpressionColorScaleOption[];
  selectedDatasetId: string;
  selectedLineViewId: string;
  selectedColorScaleId: string;
  loading: boolean;
  onDatasetChange: (datasetId: string) => void;
  onLineViewChange: (lineViewId: string) => void;
  onColorScaleChange: (colorScaleId: string) => void;
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid hsl(150 12% 88%)",
  fontSize: "14px",
  color: "hsl(150 10% 10%)",
  background: "#ffffff",
};

export default function ExpressionControls({
  datasets,
  lineViews,
  colorScales,
  selectedDatasetId,
  selectedLineViewId,
  selectedColorScaleId,
  loading,
  onDatasetChange,
  onLineViewChange,
  onColorScaleChange,
}: ExpressionControlsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "16px",
      }}
    >
      <label style={{ display: "grid", gap: "8px" }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "hsl(150 10% 25%)" }}>
          Dataset
        </span>
        <select
          value={selectedDatasetId}
          onChange={(event) => onDatasetChange(event.target.value)}
          disabled={loading}
          style={inputStyle}
        >
          {datasets.map((dataset) => (
            <option key={dataset.id} value={dataset.id}>
              {dataset.name}
              {dataset.status === "empty" ? " · Empty" : ""}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "grid", gap: "8px" }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "hsl(150 10% 25%)" }}>
          Line view
        </span>
        <select
          value={selectedLineViewId}
          onChange={(event) => onLineViewChange(event.target.value)}
          disabled={loading || lineViews.length === 0}
          style={inputStyle}
        >
          {lineViews.length === 0 && <option value="">No line views available</option>}

          {lineViews.map((lineView) => (
            <option key={lineView.id} value={lineView.id}>
              {lineView.label}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "grid", gap: "8px" }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "hsl(150 10% 25%)" }}>
          Heatmap color scale
        </span>
        <select
          value={selectedColorScaleId}
          onChange={(event) => onColorScaleChange(event.target.value)}
          disabled={loading}
          style={inputStyle}
        >
          {colorScales.map((colorScale) => (
            <option key={colorScale.id} value={colorScale.id}>
              {colorScale.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
