import { Guest } from "@/types";
import { getSheetData, updateRsvpInSheet } from "./sheets";

export const getInviteByCode = async (code: string): Promise<Guest> => {
  const response = code
    ? await getSheetData(process.env.GOOGLE_SPREADSHEET_ID!, "RSVP!A3:E37")
    : { data: null, error: null };

  const [inviteCode, name, maxNumberOfGuests, going, numberOfGuests] =
    response?.data?.find((row: string[]) => row[0] === code) || [];

  return {
    inviteCode,
    name,
    going: going === "Si" ? true : false,
    numberOfGuests,
    maxNumberOfGuests,
  } satisfies Guest;
};

export const submitRsvp = async (data: {
  name: string;
  inviteCode: string;
  going: boolean;
  numberOfGuests: number;
  maxNumberOfGuests: number;
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
    }
  );
};
