import { useState, useEffect, useCallback } from 'react';
import { Calendar } from './components/Calendar';
import { BookingModal } from './components/BookingModal';
import { BookingsList } from './components/BookingsList';
import { bookingService } from './services/bookingService';
import { Booking, BookingFormData } from './types/booking';
import { Building2 } from 'lucide-react';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await bookingService.getBookings();
      setBookings(data);
    } catch {
      showNotification('Failed to load bookings', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (formData: BookingFormData) => {
    await bookingService.createBooking(formData);
    await loadBookings();
    showNotification('Booking created successfully!', 'success');
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-12 h-12 text-blue-600" />
            <h1 className="text-5xl font-bold text-gray-800">Event Hall Booking</h1>
          </div>
          <p className="text-gray-600 text-lg">Book your perfect venue for any occasion</p>
        </div>

        {notification && (
          <div className={`max-w-md mx-auto mb-6 px-6 py-4 rounded-lg shadow-lg ${
            notification.type === 'success'
              ? 'bg-green-100 border-2 border-green-300 text-green-800'
              : 'bg-red-100 border-2 border-red-300 text-red-800'
          }`}>
            {notification.message}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Calendar
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                onDateSelect={handleDateSelect}
                bookings={bookings}
              />
            </div>

            <div className="lg:col-span-1">
              <BookingsList bookings={bookings} />
            </div>
          </div>
        )}

        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          onSubmit={handleBookingSubmit}
        />
      </div>
    </div>
  );
}

export default App;
