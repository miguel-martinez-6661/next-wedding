import { Guest } from "@/types";
import { getSheetData, updateRsvpInSheet } from "./sheets";
import { SHEET_RANGE } from "./utils";

const emptyGuest = {
  inviteCode: "",
  name: "",
  going: null,
  numberOfGuests: 0,
  maxNumberOfGuests: 0,
  qrCode: "",
  isConfirmed: false,
  tableNumber: undefined,
} satisfies Guest & { isConfirmed: boolean };

const toNumber = (value?: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const toOptionalNumber = (value?: string) => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const normalizeGoing = (value?: string) => {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (normalized === "si" || normalized === "sí") return true;
  if (normalized === "no") return false;
  return null;
};

export const getInviteByCode = async (
  code: string
): Promise<Guest & { isConfirmed: boolean }> => {
  const response = code
    ? await getSheetData(process.env.GOOGLE_SPREADSHEET_ID!, SHEET_RANGE)
    : { data: null, error: null };

  if (!response.data || response.error) {
    return { ...emptyGuest };
  }

  const row = response.data.find((entry: string[]) => entry[0] === code);
  if (!row) {
    return { ...emptyGuest };
  }

  const inviteCode = row[0] ?? "";
  const name = row[1] ?? "";
  const maxNumberOfGuests = toNumber(row[2]);
  const goingValue = normalizeGoing(row[3]);
  const numberOfGuests = toNumber(row[4]);
  const qrCode = row[5] ?? "";
  const tableNumber = toOptionalNumber(row[11]);

  // Check if RSVP is confirmed (going field has a value)
  const isConfirmed = goingValue !== null;

  return {
    inviteCode,
    name,
    going: goingValue,
    numberOfGuests,
    maxNumberOfGuests,
    qrCode,
    isConfirmed,
    tableNumber,
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
    data.inviteCode,
    {
      inviteCode: data.inviteCode,
      name: data.name,
      going: data.going,
      numberOfGuests: data.numberOfGuests,
      maxNumberOfGuests: data.maxNumberOfGuests,
      qrCode: data.qrCode,
    }
  );
};
