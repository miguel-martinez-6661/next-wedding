export type Guest = {
  inviteCode: string;
  name: string;
  going: boolean | null;
  numberOfGuests: number;
  maxNumberOfGuests: number;
  qrCode: string;
  isConfirmed?: boolean;
};
