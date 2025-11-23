import { Calendar, User, Mail, Phone, Users } from 'lucide-react';
import { Booking } from '../types/booking';

interface BookingsListProps {
  bookings: Booking[];
}

export function BookingsList({ bookings }: BookingsListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const upcomingBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.booking_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate >= today;
  });

  if (upcomingBookings.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Upcoming Bookings</h3>
        <p className="text-gray-500">All dates are available for booking!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Bookings</h3>
      <div className="space-y-4">
        {upcomingBookings.map((booking) => (
          <div
            key={booking.id}
            className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-lg text-gray-800">
                  {formatDate(booking.booking_date)}
                </span>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {booking.event_type}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>{booking.customer_name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{booking.customer_email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{booking.customer_phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{booking.number_of_guests} guests</span>
              </div>
            </div>

            {booking.additional_notes && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Notes:</span> {booking.additional_notes}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
