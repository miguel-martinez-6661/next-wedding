import { Guest } from "@/types";
import { getSheetData } from "./sheets";

export const getInviteByCode = async (code: string): Promise<Guest> => {
  const response = code
    ? await getSheetData(process.env.GOOGLE_SPREADSHEET_ID!, "RSVP!A3:E37")
    : { data: null, error: null };

  const [inviteCode, name, maxNumberOfGuests, going, numberOfGuests] =
    response?.data?.find((row: string[]) => row[0] === code) || [];

  return {
    inviteCode,
    name,
    going,
    numberOfGuests,
    maxNumberOfGuests,
  } satisfies Guest;
};
