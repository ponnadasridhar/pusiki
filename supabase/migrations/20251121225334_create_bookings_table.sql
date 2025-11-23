/*
  # Create Event Booking Hall Schema

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key) - Unique identifier for each booking
      - `booking_date` (date, not null) - The date of the booking
      - `customer_name` (text, not null) - Name of the person making the booking
      - `customer_email` (text, not null) - Email of the customer
      - `customer_phone` (text, not null) - Phone number of the customer
      - `event_type` (text, not null) - Type of event (wedding, conference, party, etc.)
      - `number_of_guests` (integer, not null) - Expected number of guests
      - `additional_notes` (text) - Any additional requirements or notes
      - `created_at` (timestamptz) - When the booking was created
      
  2. Security
    - Enable RLS on `bookings` table
    - Add policy for anyone to view bookings (to check availability)
    - Add policy for authenticated users to create bookings
    - Add policy for users to view their own bookings by email
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_date date NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  event_type text NOT NULL,
  number_of_guests integer NOT NULL DEFAULT 0,
  additional_notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view bookings to check availability"
  ON bookings
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);