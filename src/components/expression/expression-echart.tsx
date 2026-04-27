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

      const chart =
        echarts.getInstanceByDom(containerRef.current) ?? echarts.init(containerRef.current);

      chartRef.current = chart;
      chart.setOption(option, true);

      const resizeObserver = new ResizeObserver(() => {
        chart.resize();
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
        chart.dispose();
        chartRef.current = null;
      };
    }, [option]);

    return <div ref={containerRef} style={{ height: `${height}px`, width: "100%" }} />;
  }
);

export default ExpressionEChart;
