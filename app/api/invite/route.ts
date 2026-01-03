import { NextRequest, NextResponse } from "next/server";
import { getInviteByCode } from "@/lib/invite";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Código no proporcionado" },
      { status: 400 }
    );
  }

  try {
    const guest = await getInviteByCode(code);

    // Check if guest was found (has inviteCode)
    if (!guest.inviteCode) {
      return NextResponse.json(
        { error: "Código no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(guest);
  } catch (error) {
    console.error("Error fetching invite:", error);
    return NextResponse.json(
      { error: "Error al obtener la información del invitado" },
      { status: 500 }
    );
  }
}
