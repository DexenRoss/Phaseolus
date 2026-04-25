import { NextResponse } from "next/server";
import type { ExpressionColorScaleId } from "@/types/expression";
import { getExpressionVisualization } from "@/server/services/expression.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const payload = await getExpressionVisualization({
      datasetId: searchParams.get("datasetId") ?? undefined,
      lineViewId: searchParams.get("lineViewId") ?? undefined,
      colorScaleId:
        (searchParams.get("colorScaleId") as ExpressionColorScaleId | null) ?? undefined,
    });

    return NextResponse.json(payload);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo cargar el módulo de expresión.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
