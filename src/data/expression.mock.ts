import type {
  ExpressionColorScaleOption,
  ExpressionDatasetSource,
} from "@/types/expression";

export const expressionColorScales: ExpressionColorScaleOption[] = [
  {
    id: "viridis",
    label: "Viridis",
    description: "Balanceada para ver gradientes amplios con buen contraste.",
    colors: ["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"],
  },
  {
    id: "ember",
    label: "Ember",
    description: "Tonos cálidos para resaltar incrementos fuertes de expresión.",
    colors: ["#1f2937", "#9a3412", "#ea580c", "#fdba74", "#fff7ed"],
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Escala fría para contrastar señales bajas y picos discretos.",
    colors: ["#0f172a", "#155e75", "#0891b2", "#67e8f9", "#ecfeff"],
  },
];

export const expressionDatasets: ExpressionDatasetSource[] = [
  {
    id: "nodulation-time-course",
    name: "Nodulation Time Course",
    description:
      "Perfil temporal de genes asociados a nodulación temprana después de inoculación.",
    organism: "Phaseolus vulgaris",
    measurement: "log2 TPM",
    normalization: "library-size normalized",
    status: "ready",
    defaultLineViewId: "core-nodulation",
    defaultColorScaleId: "viridis",
    lineViews: [
      {
        id: "core-nodulation",
        label: "Core nodulation genes",
        description:
          "Genes con una inducción progresiva a lo largo del tiempo post inoculación.",
        featureIds: ["nin", "enod40", "cle13"],
      },
      {
        id: "regulatory-balance",
        label: "Regulatory balance",
        description:
          "Factores reguladores con respuesta moderada y un represor con caída sostenida.",
        featureIds: ["nsp2", "ern1", "pub1"],
      },
    ],
    features: [
      {
        id: "nin",
        label: "NIN",
        description: "Nodule inception regulator.",
        category: "Transcription factor",
      },
      {
        id: "enod40",
        label: "ENOD40",
        description: "Early nodulin marker.",
        category: "Nodulation marker",
      },
      {
        id: "nsp2",
        label: "NSP2",
        description: "GRAS family signaling regulator.",
        category: "Signaling",
      },
      {
        id: "ern1",
        label: "ERN1",
        description: "Ethylene response factor linked to infection thread formation.",
        category: "Transcription factor",
      },
      {
        id: "cle13",
        label: "CLE13",
        description: "Peptide signal associated with nodulation feedback.",
        category: "Peptide signaling",
      },
      {
        id: "pub1",
        label: "PUB1",
        description: "E3 ligase with decreasing trend during the response.",
        category: "Negative regulator",
      },
    ],
    samples: [
      {
        id: "mock-0h",
        label: "Mock 0 h",
        condition: "Mock",
        timepointLabel: "0 h",
        replicate: "R1",
        group: "Baseline",
      },
      {
        id: "rhizobium-6h",
        label: "Rhizobium 6 h",
        condition: "Rhizobium",
        timepointLabel: "6 h",
        replicate: "R1",
        group: "Early response",
      },
      {
        id: "rhizobium-12h",
        label: "Rhizobium 12 h",
        condition: "Rhizobium",
        timepointLabel: "12 h",
        replicate: "R1",
        group: "Early response",
      },
      {
        id: "rhizobium-24h",
        label: "Rhizobium 24 h",
        condition: "Rhizobium",
        timepointLabel: "24 h",
        replicate: "R1",
        group: "Commitment",
      },
      {
        id: "rhizobium-48h",
        label: "Rhizobium 48 h",
        condition: "Rhizobium",
        timepointLabel: "48 h",
        replicate: "R1",
        group: "Nodule initiation",
      },
      {
        id: "rhizobium-72h",
        label: "Rhizobium 72 h",
        condition: "Rhizobium",
        timepointLabel: "72 h",
        replicate: "R1",
        group: "Nodule initiation",
      },
    ],
    matrix: [
      [1.2, 2.1, 4.8, 7.6, 8.3, 7.1],
      [0.8, 1.5, 3.6, 6.8, 9.2, 8.7],
      [2.4, 2.9, 3.4, 3.8, 4.1, 3.9],
      [1.9, 2.4, 3.2, 4.4, 4.7, 4.2],
      [0.5, 0.9, 1.8, 3.1, 5.6, 6.4],
      [3.6, 3.3, 3.0, 2.8, 2.5, 2.2],
    ],
  },
  {
    id: "drought-response-panel",
    name: "Drought Response Panel",
    description:
      "Serie corta con marcadores de estrés hídrico y recuperación en hojas jóvenes.",
    organism: "Phaseolus vulgaris",
    measurement: "log2 normalized counts",
    normalization: "variance stabilized",
    status: "ready",
    defaultLineViewId: "stress-markers",
    defaultColorScaleId: "ember",
    lineViews: [
      {
        id: "stress-markers",
        label: "Stress markers",
        description:
          "Genes inducidos rápidamente por déficit hídrico y modulados durante recuperación.",
        featureIds: ["dreb2a", "rd29a", "nced3"],
      },
      {
        id: "recovery-balance",
        label: "Recovery balance",
        description:
          "Marcadores osmoprotectores y una referencia estable para comparar amplitudes.",
        featureIds: ["lea14", "p5cs1", "actin2"],
      },
    ],
    features: [
      {
        id: "dreb2a",
        label: "DREB2A",
        description: "Transcription factor linked to dehydration response.",
        category: "Stress regulator",
      },
      {
        id: "rd29a",
        label: "RD29A",
        description: "Canonical dehydration-responsive marker.",
        category: "Stress marker",
      },
      {
        id: "nced3",
        label: "NCED3",
        description: "ABA biosynthesis control point.",
        category: "Hormone biosynthesis",
      },
      {
        id: "lea14",
        label: "LEA14",
        description: "Late embryogenesis abundant protein.",
        category: "Protection",
      },
      {
        id: "p5cs1",
        label: "P5CS1",
        description: "Compatible solute biosynthesis enzyme.",
        category: "Osmoprotection",
      },
      {
        id: "actin2",
        label: "ACTIN2",
        description: "Reference transcript with stable abundance.",
        category: "Reference",
      },
    ],
    samples: [
      {
        id: "well-watered-d0",
        label: "Well-watered D0",
        condition: "Control",
        timepointLabel: "Day 0",
        replicate: "R1",
        group: "Baseline",
      },
      {
        id: "mild-drought-d2",
        label: "Mild drought D2",
        condition: "Mild drought",
        timepointLabel: "Day 2",
        replicate: "R1",
        group: "Stress onset",
      },
      {
        id: "moderate-drought-d4",
        label: "Moderate drought D4",
        condition: "Moderate drought",
        timepointLabel: "Day 4",
        replicate: "R1",
        group: "Stress peak",
      },
      {
        id: "rehydration-d6",
        label: "Rehydration D6",
        condition: "Recovery",
        timepointLabel: "Day 6",
        replicate: "R1",
        group: "Recovery",
      },
      {
        id: "recovery-d8",
        label: "Recovery D8",
        condition: "Recovery",
        timepointLabel: "Day 8",
        replicate: "R1",
        group: "Recovery",
      },
    ],
    matrix: [
      [1.4, 3.8, 6.1, 3.5, 2.2],
      [1.1, 4.4, 7.0, 3.9, 2.0],
      [1.7, 2.9, 5.2, 4.1, 2.8],
      [1.3, 2.1, 4.9, 4.4, 3.6],
      [1.8, 2.6, 4.7, 3.7, 2.9],
      [3.2, 3.1, 3.0, 3.1, 3.2],
    ],
  },
  {
    id: "incoming-lab-batch",
    name: "Incoming Lab Batch",
    description:
      "Contenedor vacío para futuras matrices del laboratorio mientras se define la estructura biológica final.",
    organism: "Phaseolus vulgaris",
    measurement: "pending",
    normalization: "pending",
    status: "empty",
    defaultLineViewId: "",
    defaultColorScaleId: "ocean",
    lineViews: [],
    features: [],
    samples: [],
    matrix: [],
  },
];
