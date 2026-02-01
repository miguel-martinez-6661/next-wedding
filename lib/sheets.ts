"use server";

import { Guest } from "@/types";
import { google } from "googleapis";
import { SHEET_RANGE } from "./utils";

const YES_VALUE = "Sí";
const NO_VALUE = "No";
const SHEET_CACHE_TTL_MS = 60 * 1000;
const sheetDataCache = new Map<string, { data: string[][]; timestamp: number }>();
let cachedSheetsClient: ReturnType<typeof google.sheets> | null = null;

function getCacheKey(spreadsheetId: string, range: string) {
  return `${spreadsheetId}:${range}`;
}

function invalidateSheetCache(spreadsheetId: string) {
  const prefix = `${spreadsheetId}:`;
  for (const key of sheetDataCache.keys()) {
    if (key.startsWith(prefix)) {
      sheetDataCache.delete(key);
    }
  }
}

// Initialize Google Sheets client
function getSheetsClient() {
  if (cachedSheetsClient) {
    return cachedSheetsClient;
  }

  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (
    !process.env.GOOGLE_CLIENT_EMAIL ||
    !privateKey ||
    !process.env.GOOGLE_PROJECT_ID
  ) {
    throw new Error(
      "Missing required Google Sheets environment variables. Please check your .env.local file."
    );
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    projectId: process.env.GOOGLE_PROJECT_ID,
  });

  cachedSheetsClient = google.sheets({ version: "v4", auth });
  return cachedSheetsClient;
}

/**
 * Get data from a Google Sheet
 */
export async function getSheetData(
  spreadsheetId: string,
  range: string = SHEET_RANGE
) {
  try {
    const cacheKey = getCacheKey(spreadsheetId, range);
    const cached = sheetDataCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < SHEET_CACHE_TTL_MS) {
      return { data: cached.data, error: null };
    }

    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const data = response.data.values || [];
    sheetDataCache.set(cacheKey, { data, timestamp: Date.now() });
    return { data, error: null };
  } catch (error) {
    console.error("Error getting sheet data:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Append RSVP data to Google Sheet
 */
export async function appendRsvpToSheet(
  spreadsheetId: string,
  sheetName: string,
  data: {
    inviteCode: string;
    going: boolean;
    numberOfGuests: number;
    timestamp?: string;
  }
) {
  try {
    const sheets = getSheetsClient();
    const timestamp = data.timestamp || new Date().toISOString();

    // Prepare the row data
    const values = [
      [
        timestamp,
        data.inviteCode,
        data.going ? YES_VALUE : NO_VALUE,
        data.numberOfGuests.toString(),
      ],
    ];

    // If this is the first row, add headers
    // const range = `${sheetName}!A:E`;

    // Check if sheet exists and has headers
    // const existingData = await sheets.spreadsheets.values.get({
    //   spreadsheetId,
    //   range: `${sheetName}!A1:E1`,
    // });

    // Append the data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:E`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });

    invalidateSheetCache(spreadsheetId);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error appending to sheet:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Update RSVP data in Google Sheet (for existing invitations)
 */
export async function updateRsvpInSheet(
  spreadsheetId: string = process.env.GOOGLE_SPREADSHEET_ID!,
  inviteCode: string,
  data: Guest
) {
  try {
    const sheets = getSheetsClient();

    // First, find the row with this invite code
    const allData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: SHEET_RANGE,
    });

    if (!allData.data.values) {
      return { success: false, error: "No data found in sheet" };
    }

    // Find the row index in the array (data starts at row 3, so array index 0 = sheet row 3)
    const arrayIndex = allData.data.values.findIndex(
      (row) => row[0] === inviteCode
    );

    if (arrayIndex === -1) {
      return { success: false, error: "Invite code not found in sheet" };
    }

    // Calculate the actual sheet row number (array index 0 = sheet row 3)
    const sheetRowNumber = arrayIndex + 3;
    const range = `RSVP!A${sheetRowNumber}:E${sheetRowNumber}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            inviteCode,
            data.name,
            data.maxNumberOfGuests,
            data.going ? YES_VALUE : NO_VALUE,
            data.numberOfGuests,
          ],
        ],
      },
    });

    invalidateSheetCache(spreadsheetId);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error updating sheet:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
