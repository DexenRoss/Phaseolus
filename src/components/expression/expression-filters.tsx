"use client";

import { useState } from "react";

type ExpressionFiltersProps = {
  onGenerate: (filters: FilterState) => void;
  loading: boolean;
};

export type FilterState = {
  organism: string;
  geneInputMode: "list" | "file";
  geneList: string;
  pValue: string;
  logFC: string;
  cpm: string;
  referenceCondition: string;
  conditions: string;
  tissue: string;
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid hsl(150 12% 88%)",
  fontSize: "13px",
  color: "hsl(150 10% 10%)",
  background: "#ffffff",
  outline: "none",
  transition: "border-color 0.2s",
};

const inputStyle: React.CSSProperties = {
  ...selectStyle,
};

const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  color: "hsl(150 8% 42%)",
  marginBottom: "4px",
  display: "block",
};

export default function ExpressionFilters({ onGenerate, loading }: ExpressionFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    organism: "phaseolus-vulgaris",
    geneInputMode: "list",
    geneList: "PHVUL_001G000100\nPHVUL_001G001200\nPHVUL_001G003350",
    pValue: "0.05",
    logFC: "1.0",
    cpm: "1.0",
    referenceCondition: "",
    conditions: "",
    tissue: "",
  });

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      style={{
        display: "grid",
        gap: "24px",
        padding: "24px",
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid hsl(150 12% 88%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            height: "28px",
            width: "28px",
            borderRadius: "8px",
            background: "hsl(152 68% 36%)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
        </div>
        <span style={{ fontWeight: 700, fontSize: "15px", color: "hsl(152 68% 36%)", letterSpacing: "0.05em" }}>
          FILTROS
        </span>
      </div>

      {/* Datos Generales */}
      <div>
        <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "hsl(150 10% 10%)", marginBottom: "12px" }}>
          Datos Generales
        </h4>
        <label style={labelStyle}>
          Organismo/Referencia *
        </label>
        <select
          value={filters.organism}
          onChange={(e) => updateFilter("organism", e.target.value)}
          style={selectStyle}
        >
          <option value="phaseolus-vulgaris">Phaseolus vulgaris</option>
          <option value="phaseolus-acutifolius">Phaseolus acutifolius</option>
        </select>
      </div>

      {/* Genes */}
      <div>
        <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "hsl(150 10% 10%)", marginBottom: "12px" }}>
          Genes
        </h4>
        <label style={{ ...labelStyle, marginBottom: "8px" }}>
          ¿Cómo quieres ingresar los genes?
        </label>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "hsl(150 10% 10%)", cursor: "pointer" }}>
            <input
              type="radio"
              name="geneInputMode"
              checked={filters.geneInputMode === "list"}
              onChange={() => updateFilter("geneInputMode", "list")}
              style={{ accentColor: "hsl(152 68% 36%)" }}
            />
            Escribir o pegar lista
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "hsl(150 10% 10%)", cursor: "pointer" }}>
            <input
              type="radio"
              name="geneInputMode"
              checked={filters.geneInputMode === "file"}
              onChange={() => updateFilter("geneInputMode", "file")}
              style={{ accentColor: "hsl(152 68% 36%)" }}
            />
            Subir archivo
          </label>
        </div>

        {filters.geneInputMode === "list" ? (
          <textarea
            value={filters.geneList}
            onChange={(e) => updateFilter("geneList", e.target.value)}
            placeholder="PHVUL_001G000100&#10;PHVUL_001G001200"
            rows={4}
            style={{
              ...inputStyle,
              resize: "vertical",
              fontFamily: "'Inter', monospace",
              fontSize: "12px",
              lineHeight: "1.6",
            }}
          />
        ) : (
          <div
            style={{
              border: "2px dashed hsl(150 12% 82%)",
              borderRadius: "10px",
              padding: "16px",
              textAlign: "center",
              color: "hsl(150 8% 42%)",
              fontSize: "13px",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 8px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Arrastra un archivo o haz clic
          </div>
        )}
      </div>

      {/* Filtros estadísticos */}
      <div>
        <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "hsl(150 10% 10%)", marginBottom: "12px" }}>
          Filtros estadísticos
        </h4>

        <div style={{ display: "grid", gap: "10px" }}>
          <div>
            <label style={labelStyle}>p-value máximo</label>
            <input
              type="number"
              step="0.01"
              value={filters.pValue}
              onChange={(e) => updateFilter("pValue", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Log2 Fold Change mínimo</label>
            <input
              type="number"
              step="0.1"
              value={filters.logFC}
              onChange={(e) => updateFilter("logFC", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>CPM mínimo</label>
            <input
              type="number"
              step="0.1"
              value={filters.cpm}
              onChange={(e) => updateFilter("cpm", e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Condiciones y tejidos */}
      <div>
        <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "hsl(150 10% 10%)", marginBottom: "12px" }}>
          Condiciones y tejidos
        </h4>

        <div style={{ display: "grid", gap: "10px" }}>
          <div>
            <label style={labelStyle}>Condición de referencia</label>
            <select
              value={filters.referenceCondition}
              onChange={(e) => updateFilter("referenceCondition", e.target.value)}
              style={selectStyle}
            >
              <option value="">Selecciona condición de referencia</option>
              <option value="mock">Mock</option>
              <option value="control">Control</option>
              <option value="well-watered">Well-watered</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Condiciones / tratamientos a comparar</label>
            <select
              value={filters.conditions}
              onChange={(e) => updateFilter("conditions", e.target.value)}
              style={selectStyle}
            >
              <option value="">Selecciona una o más condiciones</option>
              <option value="rhizobium">Rhizobium</option>
              <option value="drought">Drought</option>
              <option value="salt-stress">Salt stress</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Tejido / órgano</label>
            <select
              value={filters.tissue}
              onChange={(e) => updateFilter("tissue", e.target.value)}
              style={selectStyle}
            >
              <option value="">Selecciona tejido</option>
              <option value="root">Root</option>
              <option value="leaf">Leaf</option>
              <option value="nodule">Nodule</option>
              <option value="seed">Seed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generate button */}
      <button
        type="button"
        onClick={() => onGenerate(filters)}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "none",
          background: loading ? "hsl(150 8% 70%)" : "hsl(152 68% 36%)",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          boxShadow: loading ? "none" : "0 4px 14px rgba(5, 150, 105, 0.25)",
        }}
      >
        {loading ? "Generando..." : "Generar gráfica"}
      </button>
    </div>
  );
}
