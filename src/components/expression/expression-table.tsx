"use client";

type DERow = {
  geneId: string;
  symbol: string;
  lfc: number;
  pValue: number;
};

type ExpressionTableProps = {
  data: DERow[];
  onDownload?: () => void;
};

const sampleData: DERow[] = [
  { geneId: "PHVUL_001001", symbol: "PvGene1", lfc: 2.30, pValue: 0.0012 },
  { geneId: "PHVUL_001002", symbol: "PvGene1", lfc: 2.30, pValue: 0.0012 },
  { geneId: "PHVUL_001003", symbol: "PvGene1", lfc: -3.30, pValue: 0.0012 },
  { geneId: "PHVUL_001004", symbol: "PvGene1", lfc: 2.30, pValue: 0.0012 },
  { geneId: "PHVUL_001005", symbol: "PvGene1", lfc: 2.30, pValue: 0.0012 },
  { geneId: "PHVUL_002001", symbol: "PvNIN", lfc: 4.12, pValue: 0.0003 },
  { geneId: "PHVUL_002002", symbol: "PvENOD40", lfc: -1.87, pValue: 0.0089 },
  { geneId: "PHVUL_002003", symbol: "PvDREB2A", lfc: 5.44, pValue: 0.0001 },
];

export default function ExpressionTable({ data, onDownload }: ExpressionTableProps) {
  const rows = data.length > 0 ? data : sampleData;

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        border: "1px solid hsl(150 12% 88%)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "hsl(150 10% 10%)" }}>
            Expresión Diferencial
          </h3>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: "hsl(150 8% 42%)" }}>
            Resultados filtrados · {rows.length} genes
          </p>
        </div>
        <button
          type="button"
          onClick={onDownload}
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
            transition: "all 0.2s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Descargar tabla
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid hsl(150 12% 90%)" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "hsl(152 68% 36%)",
                color: "#ffffff",
              }}
            >
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, fontSize: "12px", letterSpacing: "0.03em" }}>
                Gene ID
              </th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, fontSize: "12px", letterSpacing: "0.03em" }}>
                Símbolo
              </th>
              <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, fontSize: "12px", letterSpacing: "0.03em" }}>
                LFC
              </th>
              <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, fontSize: "12px", letterSpacing: "0.03em" }}>
                p-value
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.geneId}
                style={{
                  background: i % 2 === 0 ? "#ffffff" : "hsl(149 40% 97%)",
                  borderBottom: "1px solid hsl(150 12% 92%)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "hsl(149 40% 94%)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "#ffffff" : "hsl(149 40% 97%)";
                }}
              >
                <td style={{ padding: "10px 16px", fontFamily: "'Inter', monospace", fontWeight: 500, color: "hsl(150 10% 10%)" }}>
                  {row.geneId}
                </td>
                <td style={{ padding: "10px 16px", color: "hsl(150 10% 25%)" }}>
                  {row.symbol}
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    textAlign: "right",
                    fontWeight: 600,
                    fontFamily: "'Inter', monospace",
                    color: row.lfc >= 0 ? "hsl(152 68% 32%)" : "hsl(0 84% 50%)",
                  }}
                >
                  {row.lfc >= 0 ? "+" : ""}{row.lfc.toFixed(2)}
                </td>
                <td style={{ padding: "10px 16px", textAlign: "right", fontFamily: "'Inter', monospace", color: "hsl(150 8% 42%)" }}>
                  {row.pValue.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type { DERow };
