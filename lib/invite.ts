import { Guest } from "@/types";
import { getSheetData, updateRsvpInSheet } from "./sheets";

export const getInviteByCode = async (
  code: string
): Promise<Guest & { isConfirmed: boolean }> => {
  const response = code
    ? await getSheetData(
        process.env.GOOGLE_SPREADSHEET_ID!,
        "RSVP!A3:F47"
      )
    : { data: null, error: null };

  const [inviteCode, name, maxNumberOfGuests, going, numberOfGuests, qrCode] =
    response?.data?.find((row: string[]) => row[0] === code) || [];
  
  // Check if RSVP is confirmed (going field has a value)
  const isConfirmed = going === "Si" || going === "No";

  return {
    inviteCode,
    name,
    going: going === "Si" ? true : going === "No" ? false : null,
    numberOfGuests: numberOfGuests ? Number(numberOfGuests) : 0,
    maxNumberOfGuests: maxNumberOfGuests ? Number(maxNumberOfGuests) : 0,
    qrCode,
    isConfirmed,
  } satisfies Guest & { isConfirmed: boolean };
};

export const submitRsvp = async (data: {
  name: string;
  inviteCode: string;
  going: boolean;
  numberOfGuests: number;
  maxNumberOfGuests: number;
  qrCode: string;
}) => {
  return await updateRsvpInSheet(
    process.env.GOOGLE_SPREADSHEET_ID!,
    "RSVP",
    data.inviteCode,
    {
      inviteCode: data.inviteCode,
      name: data.name,
      going: data.going,
      numberOfGuests: data.numberOfGuests,
      maxNumberOfGuests: data.maxNumberOfGuests,
      qrCode: data.qrCode
    }
  );
};
