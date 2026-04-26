"use client";

import type { EChartsOption } from "echarts";
import type { ExpressionVisualizationResponse } from "@/types/expression";
import ExpressionEChart from "@/components/expression/expression-echart";

type ExpressionHeatmapProps = {
  view: ExpressionVisualizationResponse;
};

export default function ExpressionHeatmap({ view }: ExpressionHeatmapProps) {
  if (!view.heatmap) {
    return null;
  }

  const option: EChartsOption = {
    animationDuration: 350,
    grid: {
      left: 112,
      right: 72,
      top: 24,
      bottom: 72,
    },
    tooltip: {
      position: "top",
      backgroundColor: "#ffffff",
      borderColor: "#cbd5e1",
      borderWidth: 1,
      textStyle: {
        color: "#0f172a",
      },
      formatter: (params) => {
        const entry = Array.isArray(params) ? params[0] : params;

        if (!entry) {
          return "";
        }

        const cell = entry.data as {
          featureLabel: string;
          featureCategory: string;
          sampleLabel: string;
          condition: string;
          timepointLabel: string;
          replicate: string;
          group: string;
          value: [number, number, number];
        };

        return [
          `<div style="font-weight:700;margin-bottom:8px;">${cell.featureLabel} → ${cell.sampleLabel}</div>`,
          `<div><strong>Valor:</strong> ${cell.value[2].toFixed(2)}</div>`,
          `<div><strong>Fila:</strong> ${cell.featureLabel}</div>`,
          `<div><strong>Columna:</strong> ${cell.sampleLabel}</div>`,
          `<div><strong>Categoría:</strong> ${cell.featureCategory}</div>`,
          `<div><strong>Condición:</strong> ${cell.condition}</div>`,
          `<div><strong>Tiempo:</strong> ${cell.timepointLabel}</div>`,
          `<div><strong>Réplica:</strong> ${cell.replicate}</div>`,
          `<div><strong>Grupo:</strong> ${cell.group}</div>`,
        ].join("");
      },
    },
    xAxis: {
      type: "category",
      data: view.heatmap.columnLabels,
      splitArea: {
        show: true,
      },
      axisLabel: {
        color: "#475569",
        rotate: 20,
      },
      axisLine: {
        lineStyle: {
          color: "#94a3b8",
        },
      },
    },
    yAxis: {
      type: "category",
      data: view.heatmap.rowLabels,
      splitArea: {
        show: true,
      },
      axisLabel: {
        color: "#475569",
      },
      axisLine: {
        lineStyle: {
          color: "#94a3b8",
        },
      },
    },
    visualMap: {
      min: view.heatmap.minValue,
      max: view.heatmap.maxValue,
      orient: "horizontal",
      left: "center",
      bottom: 20,
      calculable: true,
      text: ["Higher", "Lower"],
      textStyle: {
        color: "#334155",
      },
      inRange: {
        color: view.colorScale.colors,
      },
    },
    series: [
      {
        name: "Expression heatmap",
        type: "heatmap",
        data: view.heatmap.cells.map((cell) => ({
          value: [cell.columnIndex, cell.rowIndex, cell.value],
          featureLabel: cell.featureLabel,
          featureCategory: cell.featureCategory,
          sampleLabel: cell.sampleLabel,
          condition: cell.condition,
          timepointLabel: cell.timepointLabel,
          replicate: cell.replicate,
          group: cell.group,
        })),
        label: {
          show: true,
          formatter: ({ data }) => {
            const cell = data as { value: [number, number, number] };
            return cell.value[2].toFixed(1);
          },
          color: "#0f172a",
          fontSize: 11,
        },
        emphasis: {
          itemStyle: {
            borderColor: "#0f172a",
            borderWidth: 1,
          },
        },
      },
    ],
  };

  return <ExpressionEChart option={option} height={460} />;
}
