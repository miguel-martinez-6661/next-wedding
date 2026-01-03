"use server";

import { Guest } from "@/types";
import { google } from "googleapis";

// Initialize Google Sheets client
function getSheetsClient() {
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

  return google.sheets({ version: "v4", auth });
}

/**
 * Get data from a Google Sheet
 */
// Yes, you can cache the result of this call (getSheetData), especially if your sheet data does not change frequently or you want to reduce API calls and improve performance.
// In a serverless environment (like Next.js "use server"), you can use an in-memory cache like a simple Map for the server session, or a more persistent cache like Redis for longer-term caching.
//
// Example: Basic in-memory cache (not shared across serverless instances, just for illustration):

// const _sheetDataCache = new Map<
//   string,
//   { data: any; error: any; timestamp: number }
// >();
// const CACHE_TTL_MS = 60 * 60 * 1000; // cache for 1 hour

// export async function getSheetDataCached(
//   spreadsheetId: string,
//   range: string = "RSVP!A3:F47"
// ) {
//   const cacheKey = `${spreadsheetId}:${range}`;
//   const cached = _sheetDataCache.get(cacheKey);
//   const now = Date.now();

//   if (cached && now - cached.timestamp < CACHE_TTL_MS) {
//     return cached;
//   }

//   const result = await getSheetData(spreadsheetId, range);
//   _sheetDataCache.set(cacheKey, { ...result, timestamp: now });
//   return result;
// }

// Note: For production, use an external cache like Redis if you need persistence across serverless instances.

export async function getSheetData(
  spreadsheetId: string,
  range: string = "RSVP!A3:F47"
) {
  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return { data: response.data.values || [], error: null };
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
        data.going ? "Sí" : "No",
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
  sheetName: string,
  inviteCode: string,
  data: Guest
) {
  try {
    const sheets = getSheetsClient();

    // First, find the row with this invite code
    const allData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A3:E37`,
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
    const range = `${sheetName}!A${sheetRowNumber}:E${sheetRowNumber}`;
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
            data.going ? "Si" : "No",
            data.numberOfGuests,
          ],
        ],
      },
    });

    return { success: true, error: null };
  } catch (error) {
    console.error("Error updating sheet:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
