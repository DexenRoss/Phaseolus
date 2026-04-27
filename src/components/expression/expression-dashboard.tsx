"use client";

import { useEffect, useState } from "react";
import ExpressionControls from "@/components/expression/expression-controls";
import ExpressionHeatmap from "@/components/expression/expression-heatmap";
import ExpressionLineChart from "@/components/expression/expression-line-chart";
import type {
  ExpressionDatasetSummary,
  ExpressionModuleBootstrap,
  ExpressionVisualizationResponse,
} from "@/types/expression";

type ExpressionDashboardProps = ExpressionModuleBootstrap;

function findDatasetSummary(
  datasets: ExpressionDatasetSummary[],
  datasetId: string
): ExpressionDatasetSummary | undefined {
  return datasets.find((dataset) => dataset.id === datasetId);
}

function buildQueryString(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  return searchParams.toString();
}

function StatusCard({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        border: "1px solid hsl(150 12% 88%)",
        display: "grid",
        gap: "12px",
      }}
    >
      <div>
        <h3 style={{ margin: 0, fontSize: "20px", color: "hsl(150 10% 10%)" }}>{title}</h3>
        <p style={{ margin: "8px 0 0", color: "hsl(150 8% 42%)" }}>{description}</p>
      </div>

      {action}
    </div>
  );
}

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        border: "1px solid hsl(150 12% 88%)",
        display: "grid",
        gap: "20px",
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: "22px", color: "hsl(150 10% 10%)" }}>{title}</h2>
        <p style={{ margin: "8px 0 0", color: "hsl(150 8% 42%)" }}>{description}</p>
      </div>

      {children}
    </div>
  );
}

export default function ExpressionDashboard({
  datasets,
  initialView,
}: ExpressionDashboardProps) {
  const [selectedDatasetId, setSelectedDatasetId] = useState(initialView.dataset.id);
  const [selectedLineViewId, setSelectedLineViewId] = useState(initialView.lineView?.id ?? "");
  const [selectedColorScaleId, setSelectedColorScaleId] = useState<string>(
    initialView.colorScale.id
  );
  const [view, setView] = useState<ExpressionVisualizationResponse>(initialView);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasLoadedRemoteView, setHasLoadedRemoteView] = useState(false);

  useEffect(() => {
    if (!hasLoadedRemoteView) {
      setHasLoadedRemoteView(true);
      return;
    }

    const controller = new AbortController();

    async function loadView() {
      setLoading(true);
      setError("");

      try {
        const query = buildQueryString({
          datasetId: selectedDatasetId,
          lineViewId: selectedLineViewId,
          colorScaleId: selectedColorScaleId,
        });
        const response = await fetch(`/api/expression?${query}`, {
          signal: controller.signal,
        });

        const payload = (await response.json()) as ExpressionVisualizationResponse | { error: string };

        if (!response.ok || "error" in payload) {
          throw new Error("error" in payload ? payload.error : "No se pudo cargar la visualización.");
        }

        setView(payload);
      } catch (fetchError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "No se pudo actualizar el módulo de expresión."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadView();

    return () => controller.abort();
  }, [hasLoadedRemoteView, selectedColorScaleId, selectedDatasetId, selectedLineViewId]);

  const currentDataset = findDatasetSummary(datasets, selectedDatasetId) ?? view.dataset;
  const isEmptyView = currentDataset.status === "empty" || !view.lineChart || !view.heatmap;

  return (
    <section style={{ display: "grid", gap: "24px" }}>
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            fontWeight: 800,
            color: "hsl(150 10% 10%)",
          }}
        >
          Expression Charts
        </h1>
        <p style={{ color: "hsl(150 8% 42%)", marginTop: "8px", maxWidth: "880px" }}>
          Explora perfiles de expresión con datasets mock coherentes para pruebas del dashboard.
          La capa de servicio ya separa dataset, vistas de línea y heatmap para conectar más
          adelante matrices reales del laboratorio.
        </p>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          border: "1px solid hsl(150 12% 88%)",
          display: "grid",
          gap: "20px",
        }}
      >
        <ExpressionControls
          datasets={datasets}
          lineViews={view.availableLineViews}
          colorScales={view.availableColorScales}
          selectedDatasetId={selectedDatasetId}
          selectedLineViewId={selectedLineViewId}
          selectedColorScaleId={selectedColorScaleId}
          loading={loading}
          onDatasetChange={(datasetId) => {
            const dataset = findDatasetSummary(datasets, datasetId);
            setSelectedDatasetId(datasetId);
            setSelectedLineViewId(dataset?.defaultLineViewId ?? "");
            setSelectedColorScaleId(dataset?.defaultColorScaleId ?? selectedColorScaleId);
          }}
          onLineViewChange={setSelectedLineViewId}
          onColorScaleChange={setSelectedColorScaleId}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          <div
            style={{
              padding: "18px",
              borderRadius: "14px",
              background: "hsl(149 40% 97%)",
              border: "1px solid hsl(150 12% 88%)",
            }}
          >
            <div style={{ fontSize: "13px", color: "hsl(150 8% 42%)" }}>Dataset</div>
            <div style={{ marginTop: "8px", fontWeight: 700, color: "hsl(150 10% 10%)" }}>
              {currentDataset.name}
            </div>
          </div>

          <div
            style={{
              padding: "18px",
              borderRadius: "14px",
              background: "hsl(149 40% 97%)",
              border: "1px solid hsl(150 12% 88%)",
            }}
          >
            <div style={{ fontSize: "13px", color: "hsl(150 8% 42%)" }}>Features × samples</div>
            <div style={{ marginTop: "8px", fontWeight: 700, color: "hsl(150 10% 10%)" }}>
              {currentDataset.featureCount} × {currentDataset.sampleCount}
            </div>
          </div>

          <div
            style={{
              padding: "18px",
              borderRadius: "14px",
              background: "hsl(149 40% 97%)",
              border: "1px solid hsl(150 12% 88%)",
            }}
          >
            <div style={{ fontSize: "13px", color: "hsl(150 8% 42%)" }}>Quantification</div>
            <div style={{ marginTop: "8px", fontWeight: 700, color: "hsl(150 10% 10%)" }}>
              {currentDataset.measurement}
            </div>
          </div>

          <div
            style={{
              padding: "18px",
              borderRadius: "14px",
              background: "hsl(149 40% 97%)",
              border: "1px solid hsl(150 12% 88%)",
            }}
          >
            <div style={{ fontSize: "13px", color: "hsl(150 8% 42%)" }}>Normalization</div>
            <div style={{ marginTop: "8px", fontWeight: 700, color: "hsl(150 10% 10%)" }}>
              {currentDataset.normalization}
            </div>
          </div>
        </div>

        {view.lineView && (
          <div
            style={{
              padding: "18px",
              borderRadius: "14px",
              background: "hsl(149 40% 96%)",
              border: "1px solid hsl(150 30% 82%)",
              color: "hsl(152 50% 25%)",
            }}
          >
            <strong>{view.lineView.label}</strong>
            <div style={{ marginTop: "6px" }}>{view.lineView.description}</div>
          </div>
        )}
      </div>

      {loading && (
        <StatusCard
          title="Updating charts"
          description="Cargando la visualización seleccionada del módulo de expresión."
        />
      )}

      {error && (
        <StatusCard
          title="Expression view error"
          description={error}
          action={
            <button
              type="button"
              onClick={() => {
                setHasLoadedRemoteView(false);
                setError("");
              }}
              style={{
                width: "fit-content",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "none",
                background: "hsl(152 68% 36%)",
                color: "#ffffff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Retry
            </button>
          }
        />
      )}

      {!error && isEmptyView && !loading && (
        <StatusCard
          title="No expression matrix available"
          description="El dataset seleccionado todavía no tiene filas y columnas curadas. La ruta ya soporta este estado vacío para futuras cargas reales."
        />
      )}

      {!error && !isEmptyView && (
        <>
          <ChartCard
            title="Line chart"
            description="Serie comparativa por condiciones o tiempos. El tooltip muestra serie, muestra, valor exacto y contexto experimental."
          >
            <ExpressionLineChart view={view} />
          </ChartCard>

          <ChartCard
            title="Heatmap"
            description={`Matriz completa de features por muestra. Escala actual: ${view.colorScale.label}.`}
          >
            <ExpressionHeatmap view={view} />
          </ChartCard>
        </>
      )}
    </section>
  );
}
