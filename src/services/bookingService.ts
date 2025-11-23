import { supabase } from '../lib/supabase';
import { Booking, BookingFormData } from '../types/booking';

export const bookingService = {
  async getBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('booking_date', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getBookingsByDateRange(startDate: string, endDate: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .gte('booking_date', startDate)
      .lte('booking_date', endDate)
      .order('booking_date', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async checkAvailability(date: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('bookings')
      .select('id')
      .eq('booking_date', date)
      .maybeSingle();

    if (error) throw error;
    return data === null;
  },

  async createBooking(bookingData: BookingFormData): Promise<Booking> {
    const isAvailable = await this.checkAvailability(bookingData.booking_date);

    if (!isAvailable) {
      throw new Error('This date is already booked');
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();

    if (error) {
      console.error('Booking error:', error);
      throw new Error(error.message || 'Failed to create booking');
    }
    return data;
  }
};
