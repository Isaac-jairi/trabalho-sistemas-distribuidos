import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const response = await fetch("http://localhost:3333/gerar-boleto-pdf-sd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boleto: formData }),
    });

    if (!response.ok) {
      const responseText = await response.json();
      throw new Error(responseText.message || "Failed to send data to API");
    }

    // Get the PDF blob from the response
    const pdfBlob = await response.blob();

    // Create a new response with the PDF blob
    return new NextResponse(pdfBlob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="boleto.pdf"',
      },
    });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
