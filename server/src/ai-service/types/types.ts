export interface JsonObject {
  isBookRequest: boolean;
  data: BookRequestData;
}

export interface BookRequestData {
  date: string;
  startTime: string;
  endTime: string;
}

export interface AIAgentBookingRequest {
  date: string;
  startTime: string;
  endTime: string;
  userId: string;
}
