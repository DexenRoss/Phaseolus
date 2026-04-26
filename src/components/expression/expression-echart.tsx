"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

type ExpressionEChartProps = {
  option: EChartsOption;
  height?: number;
};

export default function ExpressionEChart({
  option,
  height = 420,
}: ExpressionEChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const chart =
      echarts.getInstanceByDom(containerRef.current) ?? echarts.init(containerRef.current);

    chart.setOption(option, true);

    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, [option]);

  return <div ref={containerRef} style={{ height: `${height}px`, width: "100%" }} />;
}
