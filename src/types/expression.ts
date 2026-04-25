export type ExpressionDatasetStatus = "ready" | "empty";

export type ExpressionColorScaleId = "viridis" | "ember" | "ocean";

export type ExpressionFeature = {
  id: string;
  label: string;
  description: string;
  category: string;
};

export type ExpressionSample = {
  id: string;
  label: string;
  condition: string;
  timepointLabel: string;
  replicate: string;
  group: string;
};

export type ExpressionLineView = {
  id: string;
  label: string;
  description: string;
  featureIds: string[];
};

export type ExpressionColorScaleOption = {
  id: ExpressionColorScaleId;
  label: string;
  description: string;
  colors: string[];
};

export type ExpressionDatasetSource = {
  id: string;
  name: string;
  description: string;
  organism: string;
  measurement: string;
  normalization: string;
  status: ExpressionDatasetStatus;
  defaultLineViewId: string;
  defaultColorScaleId: ExpressionColorScaleId;
  features: ExpressionFeature[];
  samples: ExpressionSample[];
  matrix: number[][];
  lineViews: ExpressionLineView[];
};

export type ExpressionDatasetSummary = {
  id: string;
  name: string;
  description: string;
  organism: string;
  measurement: string;
  normalization: string;
  status: ExpressionDatasetStatus;
  featureCount: number;
  sampleCount: number;
  defaultLineViewId: string;
  defaultColorScaleId: ExpressionColorScaleId;
};

export type ExpressionLinePoint = {
  sampleId: string;
  sampleLabel: string;
  condition: string;
  timepointLabel: string;
  replicate: string;
  group: string;
  value: number;
};

export type ExpressionLineSeries = {
  id: string;
  name: string;
  featureId: string;
  featureCategory: string;
  description: string;
  points: ExpressionLinePoint[];
};

export type ExpressionLineChartData = {
  xAxisLabel: string;
  yAxisLabel: string;
  series: ExpressionLineSeries[];
};

export type ExpressionHeatmapCell = {
  rowIndex: number;
  columnIndex: number;
  featureId: string;
  featureLabel: string;
  featureCategory: string;
  sampleId: string;
  sampleLabel: string;
  condition: string;
  timepointLabel: string;
  replicate: string;
  group: string;
  value: number;
};

export type ExpressionHeatmapData = {
  rowLabels: string[];
  columnLabels: string[];
  cells: ExpressionHeatmapCell[];
  minValue: number;
  maxValue: number;
};

export type ExpressionVisualizationQuery = {
  datasetId?: string;
  lineViewId?: string;
  colorScaleId?: ExpressionColorScaleId;
};

export type ExpressionVisualizationResponse = {
  dataset: ExpressionDatasetSummary;
  lineView: ExpressionLineView | null;
  colorScale: ExpressionColorScaleOption;
  availableLineViews: ExpressionLineView[];
  availableColorScales: ExpressionColorScaleOption[];
  lineChart: ExpressionLineChartData | null;
  heatmap: ExpressionHeatmapData | null;
};

export type ExpressionModuleBootstrap = {
  datasets: ExpressionDatasetSummary[];
  initialView: ExpressionVisualizationResponse;
};
