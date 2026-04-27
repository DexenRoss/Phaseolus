"use client";

import type { EChartsOption } from "echarts";
import type { ExpressionVisualizationResponse } from "@/types/expression";
import ExpressionEChart from "@/components/expression/expression-echart";

type ExpressionLineChartProps = {
  view: ExpressionVisualizationResponse;
};

const linePalette = ["#059669", "#0891b2", "#7c3aed", "#dc2626", "#d97706", "#2563eb"];

export default function ExpressionLineChart({ view }: ExpressionLineChartProps) {
  if (!view.lineChart || !view.lineView) {
    return null;
  }

  const option: EChartsOption = {
    color: linePalette,
    animationDuration: 350,
    grid: {
      left: 56,
      right: 24,
      top: 72,
      bottom: 56,
    },
    legend: {
      top: 20,
      textStyle: {
        color: "hsl(150, 10%, 25%)",
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#ffffff",
      borderColor: "hsl(150, 12%, 88%)",
      borderWidth: 1,
      textStyle: {
        color: "hsl(150, 10%, 10%)",
      },
      formatter: (params) => {
        const entries = Array.isArray(params) ? params : [params];

        if (entries.length === 0) {
          return "";
        }

        const firstEntry = entries[0];
        const point = firstEntry.data as {
          sampleLabel: string;
          condition: string;
          timepointLabel: string;
          replicate: string;
          group: string;
          value: number;
        };

        const lines = [
          `<div style="font-weight:700;margin-bottom:8px;">${point.sampleLabel}</div>`,
          `<div style="margin-bottom:8px;color:#475569;">${point.condition} · ${point.timepointLabel} · ${point.replicate}</div>`,
        ];

        for (const entry of entries) {
          const currentPoint = entry.data as {
            value: number;
          };

          lines.push(
            `<div style="display:flex;align-items:center;gap:8px;margin:4px 0;">${entry.marker}<strong>${entry.seriesName}</strong>: ${currentPoint.value.toFixed(2)}</div>`
          );
        }

        lines.push(
          `<div style="margin-top:8px;color:#475569;">Grupo: ${point.group}<br />Escala: ${view.dataset.measurement}</div>`
        );

        return lines.join("");
      },
    },
    xAxis: {
      type: "category",
      name: view.lineChart.xAxisLabel,
      nameLocation: "middle",
      nameGap: 36,
      boundaryGap: false,
      data: view.lineChart.series[0]?.points.map((point) => point.sampleLabel) ?? [],
      axisLabel: {
        color: "hsl(150, 8%, 42%)",
        rotate: 20,
      },
      axisLine: {
        lineStyle: {
          color: "hsl(150, 12%, 70%)",
        },
      },
    },
    yAxis: {
      type: "value",
      name: view.lineChart.yAxisLabel,
      nameTextStyle: {
        color: "hsl(150, 8%, 42%)",
      },
      axisLabel: {
        color: "hsl(150, 8%, 42%)",
      },
      splitLine: {
        lineStyle: {
          color: "hsl(150, 12%, 92%)",
        },
      },
    },
    series: view.lineChart.series.map((series) => ({
      name: series.name,
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 10,
      lineStyle: {
        width: 3,
      },
      emphasis: {
        focus: "series",
      },
      data: series.points.map((point) => ({
        value: point.value,
        sampleLabel: point.sampleLabel,
        condition: point.condition,
        timepointLabel: point.timepointLabel,
        replicate: point.replicate,
        group: point.group,
      })),
    })),
  };

  return <ExpressionEChart option={option} height={420} />;
}
