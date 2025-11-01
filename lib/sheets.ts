"use server";

import { google } from "googleapis";

// Initialize Google Sheets client
function getSheetsClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  
  if (!process.env.GOOGLE_CLIENT_EMAIL || !privateKey || !process.env.GOOGLE_PROJECT_ID) {
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
export async function getSheetData(spreadsheetId: string, range: string = "RSVP!A3:E37") {
  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return { data: response.data.values || [], error: null };
  } catch (error) {
    console.error("Error getting sheet data:", error);
    return { data: null, error: error instanceof Error ? error.message : "Unknown error" };
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
    const range = `${sheetName}!A:D`;
    
    // Check if sheet exists and has headers
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:D1`,
    });

    let hasHeaders = false;
    if (existingData.data.values && existingData.data.values.length > 0) {
      hasHeaders = true;
    }

    // If no headers, add them first
    if (!hasHeaders) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:D1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [["Timestamp", "Código de Invitación", "Asistirá", "Número de Invitados"]],
        },
      });
    }

    // Append the data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:D`,
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
  spreadsheetId: string,
  sheetName: string,
  inviteCode: string,
  data: {
    going: boolean;
    numberOfGuests: number;
    timestamp?: string;
  }
) {
  try {
    const sheets = getSheetsClient();
    const timestamp = data.timestamp || new Date().toISOString();

    // First, find the row with this invite code
    const allData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:D`,
    });

    if (!allData.data.values) {
      return { success: false, error: "No data found in sheet" };
    }

    // Find the row index (skip header row at index 0)
    const rowIndex = allData.data.values.findIndex(
      (row, index) => index > 0 && row[1] === inviteCode
    );

    if (rowIndex === -1) {
      // If not found, append instead
      return appendRsvpToSheet(spreadsheetId, sheetName, {
        inviteCode,
        ...data,
      });
    }

    // Update the row (rowIndex + 1 because sheets are 1-indexed)
    const range = `${sheetName}!A${rowIndex + 1}:D${rowIndex + 1}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            timestamp,
            inviteCode,
            data.going ? "Sí" : "No",
            data.numberOfGuests.toString(),
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
