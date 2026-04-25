import { expressionColorScales, expressionDatasets } from "@/data/expression.mock";
import type {
  ExpressionColorScaleId,
  ExpressionColorScaleOption,
  ExpressionDatasetSource,
  ExpressionDatasetSummary,
  ExpressionHeatmapCell,
  ExpressionHeatmapData,
  ExpressionLineChartData,
  ExpressionLineView,
  ExpressionModuleBootstrap,
  ExpressionVisualizationQuery,
  ExpressionVisualizationResponse,
} from "@/types/expression";

function toDatasetSummary(dataset: ExpressionDatasetSource): ExpressionDatasetSummary {
  return {
    id: dataset.id,
    name: dataset.name,
    description: dataset.description,
    organism: dataset.organism,
    measurement: dataset.measurement,
    normalization: dataset.normalization,
    status: dataset.status,
    featureCount: dataset.features.length,
    sampleCount: dataset.samples.length,
    defaultLineViewId: dataset.defaultLineViewId,
    defaultColorScaleId: dataset.defaultColorScaleId,
  };
}

function getDatasetOrThrow(datasetId?: string): ExpressionDatasetSource {
  const fallbackDataset =
    expressionDatasets.find((dataset) => dataset.status === "ready") ?? expressionDatasets[0];

  if (!datasetId) {
    return fallbackDataset;
  }

  const dataset = expressionDatasets.find((candidate) => candidate.id === datasetId);

  if (!dataset) {
    throw new Error(`Expression dataset "${datasetId}" was not found.`);
  }

  return dataset;
}

function resolveLineView(
  dataset: ExpressionDatasetSource,
  lineViewId?: string
): ExpressionLineView | null {
  if (dataset.lineViews.length === 0) {
    return null;
  }

  return (
    dataset.lineViews.find((lineView) => lineView.id === lineViewId) ??
    dataset.lineViews.find((lineView) => lineView.id === dataset.defaultLineViewId) ??
    dataset.lineViews[0]
  );
}

function resolveColorScale(colorScaleId?: ExpressionColorScaleId): ExpressionColorScaleOption {
  return (
    expressionColorScales.find((colorScale) => colorScale.id === colorScaleId) ??
    expressionColorScales[0]
  );
}

function buildLineChartData(
  dataset: ExpressionDatasetSource,
  lineView: ExpressionLineView | null
): ExpressionLineChartData | null {
  if (!lineView || dataset.features.length === 0 || dataset.samples.length === 0) {
    return null;
  }

  const series = lineView.featureIds
    .map((featureId) => {
      const featureIndex = dataset.features.findIndex((feature) => feature.id === featureId);

      if (featureIndex === -1) {
        return null;
      }

      const feature = dataset.features[featureIndex];
      const values = dataset.matrix[featureIndex] ?? [];

      return {
        id: feature.id,
        name: feature.label,
        featureId: feature.id,
        featureCategory: feature.category,
        description: feature.description,
        points: dataset.samples.map((sample, sampleIndex) => ({
          sampleId: sample.id,
          sampleLabel: sample.label,
          condition: sample.condition,
          timepointLabel: sample.timepointLabel,
          replicate: sample.replicate,
          group: sample.group,
          value: values[sampleIndex] ?? 0,
        })),
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  if (series.length === 0) {
    return null;
  }

  return {
    xAxisLabel: "Conditions / time points",
    yAxisLabel: `${dataset.measurement} (${dataset.normalization})`,
    series,
  };
}

function buildHeatmapData(dataset: ExpressionDatasetSource): ExpressionHeatmapData | null {
  if (dataset.features.length === 0 || dataset.samples.length === 0) {
    return null;
  }

  const cells: ExpressionHeatmapCell[] = dataset.features.flatMap((feature, rowIndex) => {
    const values = dataset.matrix[rowIndex] ?? [];

    return dataset.samples.map((sample, columnIndex) => ({
      rowIndex,
      columnIndex,
      featureId: feature.id,
      featureLabel: feature.label,
      featureCategory: feature.category,
      sampleId: sample.id,
      sampleLabel: sample.label,
      condition: sample.condition,
      timepointLabel: sample.timepointLabel,
      replicate: sample.replicate,
      group: sample.group,
      value: values[columnIndex] ?? 0,
    }));
  });

  const values = cells.map((cell) => cell.value);

  return {
    rowLabels: dataset.features.map((feature) => feature.label),
    columnLabels: dataset.samples.map((sample) => sample.label),
    cells,
    minValue: Math.min(...values),
    maxValue: Math.max(...values),
  };
}

export async function getExpressionDatasetSummaries(): Promise<ExpressionDatasetSummary[]> {
  return expressionDatasets.map(toDatasetSummary);
}

export async function getExpressionVisualization(
  query: ExpressionVisualizationQuery = {}
): Promise<ExpressionVisualizationResponse> {
  // Swap this mock catalog for Prisma or a lab ingestion layer when real biological tables land.
  const dataset = getDatasetOrThrow(query.datasetId);
  const lineView = resolveLineView(dataset, query.lineViewId);
  const colorScale = resolveColorScale(query.colorScaleId ?? dataset.defaultColorScaleId);

  return {
    dataset: toDatasetSummary(dataset),
    lineView,
    colorScale,
    availableLineViews: dataset.lineViews,
    availableColorScales: expressionColorScales,
    lineChart: buildLineChartData(dataset, lineView),
    heatmap: buildHeatmapData(dataset),
  };
}

export async function getExpressionModuleBootstrap(): Promise<ExpressionModuleBootstrap> {
  const datasets = await getExpressionDatasetSummaries();
  const initialView = await getExpressionVisualization({
    datasetId: datasets.find((dataset) => dataset.status === "ready")?.id,
  });

  return {
    datasets,
    initialView,
  };
}
