"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import ExpressionFilters from "@/components/expression/expression-filters";
import ExpressionTable from "@/components/expression/expression-table";
import type { FilterState } from "@/components/expression/expression-filters";
import type { DERow } from "@/components/expression/expression-table";
import ExpressionEChart from "@/components/expression/expression-echart";
import type { EChartHandle } from "@/components/expression/expression-echart";
import type { EChartsOption } from "echarts";
import ThemeToggle from "@/components/ThemeToggle";

/* ─── Sample data for demonstration ─── */
const sampleLineChartOption: EChartsOption = {
  color: ["#059669", "#0891b2", "#7c3aed", "#dc2626", "#d97706"],
  animationDuration: 600,
  grid: { left: 60, right: 24, top: 80, bottom: 60 },
  legend: {
    top: 16,
    textStyle: { color: "#1a2e1a", fontFamily: "'Inter', sans-serif", fontSize: 12 },
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "#ffffff",
    borderColor: "hsl(150 12% 88%)",
    borderWidth: 1,
    textStyle: { color: "#1a2e1a", fontFamily: "'Inter', sans-serif" },
  },
  xAxis: {
    type: "category",
    data: ["Mock 0h", "Rhizobium 6h", "Rhizobium 12h", "Rhizobium 24h", "Rhizobium 48h", "Rhizobium 72h"],
    name: "Condición / Tiempo",
    nameLocation: "middle",
    nameGap: 40,
    axisLabel: { color: "#4a6a4a", rotate: 15, fontFamily: "'Inter', sans-serif", fontSize: 11 },
    axisLine: { lineStyle: { color: "#a8c4a8" } },
  },
  yAxis: {
    type: "value",
    name: "log2 TPM",
    nameTextStyle: { color: "#4a6a4a", fontFamily: "'Inter', sans-serif" },
    axisLabel: { color: "#4a6a4a", fontFamily: "'Inter', sans-serif" },
    splitLine: { lineStyle: { color: "hsl(150 12% 92%)" } },
  },
  series: [
    {
      name: "NIN",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      lineStyle: { width: 3 },
      emphasis: { focus: "series" },
      data: [1.2, 2.1, 4.8, 7.6, 8.3, 7.1],
    },
    {
      name: "ENOD40",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      lineStyle: { width: 3 },
      emphasis: { focus: "series" },
      data: [0.8, 1.5, 3.6, 6.8, 9.2, 8.7],
    },
    {
      name: "CLE13",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      lineStyle: { width: 3 },
      emphasis: { focus: "series" },
      data: [0.5, 0.9, 1.8, 3.1, 5.6, 6.4],
    },
  ],
};

const sampleHeatmapOption: EChartsOption = {
  animationDuration: 400,
  grid: { left: 100, right: 60, top: 24, bottom: 80 },
  tooltip: {
    position: "top",
    backgroundColor: "#ffffff",
    borderColor: "hsl(150 12% 88%)",
    borderWidth: 1,
    textStyle: { color: "#1a2e1a", fontFamily: "'Inter', sans-serif" },
  },
  xAxis: {
    type: "category",
    data: ["con 1", "con 2", "con 3", "con 4", "con 5", "con 6", "con 7"],
    splitArea: { show: true },
    axisLabel: { color: "#4a6a4a", fontSize: 11, fontFamily: "'Inter', sans-serif" },
    axisLine: { lineStyle: { color: "#a8c4a8" } },
  },
  yAxis: {
    type: "category",
    data: ["Gene PHVUL_01", "Gene PHVUL_02", "Gene PHVUL_03", "Gene PHVUL_04"],
    splitArea: { show: true },
    axisLabel: { color: "#4a6a4a", fontSize: 11, fontFamily: "'Inter', sans-serif" },
    axisLine: { lineStyle: { color: "#a8c4a8" } },
  },
  visualMap: {
    min: 0,
    max: 10,
    orient: "horizontal",
    left: "center",
    bottom: 8,
    calculable: true,
    text: ["Alta expresión", "Baja expresión"],
    textStyle: { color: "#4a6a4a", fontFamily: "'Inter', sans-serif", fontSize: 11 },
    inRange: {
      color: ["#f0fdf4", "#86efac", "#22c55e", "#15803d", "#052e16"],
    },
  },
  series: [
    {
      name: "Heatmap",
      type: "heatmap",
      data: [
        [0,0,5.2],[1,0,3.1],[2,0,7.8],[3,0,2.4],[4,0,6.5],[5,0,8.1],[6,0,4.3],
        [0,1,8.9],[1,1,6.7],[2,1,4.2],[3,1,9.1],[4,1,3.8],[5,1,7.2],[6,1,5.5],
        [0,2,2.1],[1,2,4.5],[2,2,6.3],[3,2,5.7],[4,2,8.4],[5,2,3.9],[6,2,7.6],
        [0,3,6.8],[1,3,8.2],[2,3,3.5],[3,3,7.4],[4,3,2.9],[5,3,5.1],[6,3,9.3],
      ],
      label: {
        show: true,
        formatter: (params: unknown) => {
          const p = params as { data: number[] };
          return p.data?.[2]?.toFixed(1) ?? "";
        },
        color: "#1a2e1a",
        fontSize: 10,
        fontFamily: "'Inter', sans-serif",
      },
      emphasis: {
        itemStyle: { borderColor: "#052e16", borderWidth: 2 },
      },
    },
  ],
};

export default function GraphsPage() {
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile overlay
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true); // Desktop sidebar
  const [tableData] = useState<DERow[]>([]);
  const lineChartRef = useRef<EChartHandle>(null);
  const heatmapRef = useRef<EChartHandle>(null);

  const handleGenerate = useCallback(async (_filters: FilterState) => {
    setLoading(true);
    // TODO: Replace with real API call
    // const response = await fetch(`/api/expression?${buildQueryString(filters)}`);
    // const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSidebarOpen(false);
    setDesktopSidebarOpen(false);
  }, []);

  const downloadChart = (ref: React.RefObject<EChartHandle | null>, filename: string) => {
    const url = ref.current?.getDataURL();
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const downloadTableCSV = () => {
    const rows = tableData.length > 0 ? tableData : [
      { geneId: "PHVUL_001001", symbol: "PvGene1", lfc: 2.30, pValue: 0.0012 },
      { geneId: "PHVUL_001002", symbol: "PvGene1", lfc: 2.30, pValue: 0.0012 },
      { geneId: "PHVUL_001003", symbol: "PvGene1", lfc: -3.30, pValue: 0.0012 },
      { geneId: "PHVUL_002001", symbol: "PvNIN", lfc: 4.12, pValue: 0.0003 },
      { geneId: "PHVUL_002002", symbol: "PvENOD40", lfc: -1.87, pValue: 0.0089 },
      { geneId: "PHVUL_002003", symbol: "PvDREB2A", lfc: 5.44, pValue: 0.0001 },
    ];
    const header = "Gene ID,Symbol,LFC,p-value";
    const csv = [header, ...rows.map(r => `${r.geneId},${r.symbol},${r.lfc},${r.pValue}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expresion_diferencial.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: "100vh", background: "hsl(150 10% 97%)", overflowX: "hidden", maxWidth: "100vw", width: "100%" }}>
      {/* ─── Header ─── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid hsl(150 12% 90%)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div
              className="desktop-logo"
              style={{
                height: "32px",
                width: "32px",
                borderRadius: "8px",
                background: "hsl(152 68% 36%)",
                display: "grid",
                placeItems: "center",
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.1em",
                color: "#ffffff",
              }}
            >
              PV
            </div>
            <span style={{ fontSize: "16px", fontWeight: 800, color: "hsl(150 10% 10%)", letterSpacing: "-0.02em" }}>
              Phaseolus
            </span>
          </Link>

          <span style={{ color: "hsl(150 12% 80%)", fontWeight: 300 }}>|</span>

          <a href="https://www.unam.mx/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", transition: "opacity 0.2s" }} className="hover:opacity-80">
            <img src="/unam-logo.svg" alt="UNAM" style={{ height: "32px", width: "auto" }} />
          </a>

          <span className="desktop-logo" style={{ color: "hsl(150 12% 80%)", fontWeight: 300 }}>|</span>
          <span className="desktop-logo" style={{ fontSize: "13px", color: "hsl(150 8% 42%)", fontWeight: 500 }}>
            Gráficas de Expresión
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Desktop filter toggle */}
          <button
            type="button"
            onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
            className="desktop-filter-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid hsl(150 12% 88%)",
              background: desktopSidebarOpen ? "hsl(149 40% 96%)" : "#ffffff",
              color: "hsl(150 10% 30%)",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
            Filtros
          </button>

          {/* Mobile filter toggle */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            style={{
              display: "none",
              padding: "4px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            className="mobile-filter-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(150 10% 30%)" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <ThemeToggle />

          <Link
            href="/login"
            className="desktop-login"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "hsl(152 68% 36%)",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            Iniciar sesión →
          </Link>
        </div>
      </header>

      {/* ─── Main Layout ─── */}
      <div
        className="main-layout-grid"
        style={{
          display: "grid",
          gridTemplateColumns: desktopSidebarOpen ? "320px 1fr" : "1fr",
          minHeight: "calc(100vh - 57px)",
          gap: "0",
          transition: "grid-template-columns 0.3s ease",
        }}
      >
        {/* ─── Sidebar ─── */}
        {desktopSidebarOpen && (
          <aside
            className="desktop-sidebar"
            style={{
              padding: "20px",
              borderRight: "1px solid hsl(150 12% 90%)",
              background: "#ffffff",
              overflowY: "auto",
              maxHeight: "calc(100vh - 57px)",
              position: "sticky",
              top: "57px",
            }}
          >
            <ExpressionFilters onGenerate={handleGenerate} loading={loading} />
          </aside>
        )}

        {/* ─── Content ─── */}
        <main style={{ padding: "24px", overflowY: "auto" }}>
          <div className="content-grid" style={{ display: "grid", gap: "24px", maxWidth: "1200px" }}>
            {/* Info banner */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 20px",
                borderRadius: "12px",
                background: "hsl(149 40% 96%)",
                border: "1px solid hsl(150 30% 88%)",
                fontSize: "13px",
                color: "hsl(150 10% 25%)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(152 68% 36%)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <span>
                Descripción al pasar el mouse encima de algún dato. Utiliza los filtros de la izquierda para personalizar las gráficas.
              </span>
            </div>

            {/* ─── Line Chart ─── */}
            <div
              className="chart-card"
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                border: "1px solid hsl(150 12% 88%)",
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              <div className="chart-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div className="chart-title">
                  <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "hsl(150 10% 10%)" }}>
                    Perfil de Expresión
                  </h2>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", color: "hsl(150 8% 42%)" }}>
                    Serie comparativa por condiciones o tiempos
                  </p>
                </div>
                <button
                  type="button"
                  className="download-btn"
                  onClick={() => downloadChart(lineChartRef, "perfil_expresion.png")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    borderRadius: "10px",
                    border: "1px solid hsl(150 12% 88%)",
                    background: "hsl(149 40% 96%)",
                    color: "hsl(152 68% 36%)",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Descargar gráfica
                </button>
              </div>

              <ExpressionEChart ref={lineChartRef} option={sampleLineChartOption} height={400} />
            </div>

            {/* ─── Heatmap ─── */}
            <div
              className="chart-card"
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                border: "1px solid hsl(150 12% 88%)",
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              <div className="chart-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div className="chart-title">
                  <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "hsl(150 10% 10%)" }}>
                    Workflow / Heatmap
                  </h2>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", color: "hsl(150 8% 42%)" }}>
                    Matriz completa de expresión con escala de color verde Phaseolus
                  </p>
                </div>
                <button
                  type="button"
                  className="download-btn"
                  onClick={() => downloadChart(heatmapRef, "heatmap_expresion.png")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    borderRadius: "10px",
                    border: "1px solid hsl(150 12% 88%)",
                    background: "hsl(149 40% 96%)",
                    color: "hsl(152 68% 36%)",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Descargar gráfica
                </button>
              </div>

              <ExpressionEChart ref={heatmapRef} option={sampleHeatmapOption} height={340} />
            </div>

            {/* ─── DE Results Table ─── */}
            <ExpressionTable data={tableData} onDownload={downloadTableCSV} />
          </div>
        </main>
      </div>

      {/* ─── Mobile sidebar overlay ─── */}
      {sidebarOpen && (
        <div
          className="mobile-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "grid",
            gridTemplateColumns: "1fr",
          }}
        >
          <div
            className="mobile-sidebar-content"
            style={{
              background: "#f3fdf8",
              padding: "20px",
              overflowY: "auto",
              boxShadow: "4px 0 30px rgba(0,0,0,0.15)",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "16px" }}>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "none",
                  background: "hsl(152 68% 36%)",
                  cursor: "pointer",
                  color: "#ffffff",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ExpressionFilters onGenerate={handleGenerate} loading={loading} />
          </div>
        </div>
      )}

      {/* ─── Mobile FAB ─── */}
      <button
        className="mobile-fab"
        onClick={() => setSidebarOpen(true)}
        style={{
          display: "none",
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "hsl(152 68% 36%)",
          color: "white",
          border: "none",
          boxShadow: "0 4px 12px rgba(5, 150, 105, 0.4)",
          cursor: "pointer",
          zIndex: 45,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.89 1.14l-2.81.936a.375.375 0 01-.476-.476l.937-2.81a4.5 4.5 0 011.14-1.89L16.862 4.487z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5.25l3.75 3.75" />
        </svg>
      </button>


      {/* Mobile-only styles */}
      <style>{`
        .mobile-header-title {
          display: none;
        }
        @media (max-width: 768px) {
          body, html {
            overflow-x: hidden !important;
            width: 100vw !important;
            max-width: 100vw !important;
          }
          .main-layout-grid, .content-grid, .chart-card, main {
            min-width: 0 !important;
            width: 100% !important;
            max-width: 100vw !important;
            box-sizing: border-box !important;
          }
          .mobile-header-title {
            display: inline-block;
          }
          .desktop-logo, .desktop-login {
            display: none !important;
          }
          .mobile-filter-btn {
            display: flex !important;
          }
          .mobile-fab {
            display: flex !important;
          }
          .desktop-filter-btn {
            display: none !important;
          }
          .main-layout-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .desktop-sidebar {
            display: none !important;
          }
          main {
            padding: 16px !important;
            overflow-x: hidden;
          }
          .content-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .chart-card {
            padding: 16px !important;
            border-radius: 12px !important;
          }
          .chart-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px;
          }
          .chart-title {
            display: none;
          }
          .download-btn {
            width: fit-content;
            background: hsl(152 68% 36%) !important;
            color: #ffffff !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  );
}
