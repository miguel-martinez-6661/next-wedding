"use server";

import { appendRsvpToSheet, updateRsvpInSheet } from "./sheets";

export async function submitRsvp(formData: {
  inviteCode: string;
  going: boolean;
  numberOfGuests: number;
}) {
  try {
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME || "RSVP";

    if (!spreadsheetId) {
      return {
        success: false,
        error: "Google Spreadsheet ID not configured",
      };
    }

    // Try to update first (in case RSVP already exists), otherwise append
    const result = await updateRsvpInSheet(
      spreadsheetId,
      sheetName,
      formData.inviteCode,
      {
        going: formData.going,
        numberOfGuests: formData.numberOfGuests,
      }
    );

    return result;
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit RSVP",
    };
  }
}

