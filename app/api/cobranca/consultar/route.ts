import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { numeroBoleto } = await request.json();

    const response = await fetch("http://localhost:3333/pegar-boleto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numeroBoleto }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch boleto");
    }

    // Get the PDF blob from the response
    const pdfBlob = await response.blob();

    // Create a new response with the PDF blob
    return new NextResponse(pdfBlob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="boleto-${numeroBoleto}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
