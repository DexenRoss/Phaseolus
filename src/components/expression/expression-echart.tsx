"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

type ExpressionEChartProps = {
  option: EChartsOption;
  height?: number;
};

export type EChartHandle = {
  getDataURL: () => string | null;
};

const ExpressionEChart = forwardRef<EChartHandle, ExpressionEChartProps>(
  function ExpressionEChart({ option, height = 420 }, ref) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<echarts.ECharts | null>(null);

    useImperativeHandle(ref, () => ({
      getDataURL: () => {
        if (!chartRef.current) return null;
        return chartRef.current.getDataURL({
          type: "png",
          pixelRatio: 2,
          backgroundColor: "#ffffff",
        });
      },
    }));

    useEffect(() => {
      if (!containerRef.current) {
        return;
      }

      const getIsDark = () => document.documentElement.classList.contains("dark");

      let chart = echarts.getInstanceByDom(containerRef.current);
      if (!chart) {
        // Init with dark or light theme to ensure tooltips and text defaults are correct
        chart = echarts.init(containerRef.current, getIsDark() ? "dark" : undefined);
      }

      chartRef.current = chart;
      // Overwrite background to transparent so it uses our CSS background
      const currentOption = { ...option, backgroundColor: "transparent" };
      chart.setOption(currentOption, true);

      const resizeObserver = new ResizeObserver(() => {
        chart?.resize();
      });

      resizeObserver.observe(containerRef.current);

      const themeObserver = new MutationObserver(() => {
        const isDarkNow = getIsDark();
        if (chart) {
          chart.dispose();
          chart = echarts.init(containerRef.current, isDarkNow ? "dark" : undefined);
          chartRef.current = chart;
          chart.setOption({ ...option, backgroundColor: "transparent" }, true);
        }
      });

      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      return () => {
        resizeObserver.disconnect();
        themeObserver.disconnect();
        if (chart) {
          chart.dispose();
        }
        chartRef.current = null;
      };
    }, [option]);

    return (
      <div style={{ position: "relative", width: "100%", height: `${height}px` }}>
        <div ref={containerRef} style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }} />
      </div>
    );
  }
);

export default ExpressionEChart;
