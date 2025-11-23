export interface Booking {
  id: string;
  booking_date: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  event_type: string;
  number_of_guests: number;
  additional_notes: string;
  created_at: string;
}

export interface BookingFormData {
  booking_date: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  event_type: string;
  number_of_guests: number;
  additional_notes: string;
}
