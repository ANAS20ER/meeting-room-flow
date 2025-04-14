
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, List, Info, ClipboardCheck } from "lucide-react";
import BookingCalendar from "@/components/booking/BookingCalendar";
import RoomList, { Room, ROOMS } from "@/components/booking/RoomList";
import RoomDetails from "@/components/booking/RoomDetails";
import BookingForm from "@/components/booking/BookingForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const BookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeTab, setActiveTab] = useState("calendar");
  const isMobile = useIsMobile();

  const handleDateTimeSelect = (date: Date | undefined, timeSlot: string | null) => {
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
    // Reset room selection when date/time changes
    if (selectedRoom) {
      setSelectedRoom(null);
    }
    
    // For mobile: auto-advance to next tab after selecting date and time
    if (isMobile && date && timeSlot) {
      setActiveTab("rooms");
    }
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    
    // For mobile: auto-advance to next tab after selecting a room
    if (isMobile) {
      setActiveTab("details");
    }
  };

  const handleBookingComplete = () => {
    // Reset all selections
    setSelectedDate(undefined);
    setSelectedTimeSlot(null);
    setSelectedRoom(null);
    setActiveTab("calendar");
  };

  // Desktop layout renderer
  const renderDesktopLayout = () => (
    <div className="grid grid-cols-3 gap-6 h-full">
      {/* Left Column - Calendar */}
      <div className="col-span-1">
        <BookingCalendar
          onDateTimeSelect={handleDateTimeSelect}
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
        />
      </div>
      
      {/* Middle Column - Rooms List */}
      <div className="col-span-1">
        <RoomList
          selectedRoomId={selectedRoom?.id || null}
          onRoomSelect={handleRoomSelect}
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
        />
      </div>
      
      {/* Right Column - Room Details and Booking Form */}
      <div className="col-span-1 flex flex-col gap-6">
        <div className="flex-none">
          <RoomDetails room={selectedRoom} />
        </div>
        <div className="flex-1">
          <BookingForm
            selectedRoom={selectedRoom}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            onComplete={handleBookingComplete}
          />
        </div>
      </div>
    </div>
  );

  // Tablet layout renderer
  const renderTabletLayout = () => (
    <div className="grid grid-cols-2 gap-6">
      {/* Left Column - Calendar and Rooms */}
      <div className="flex flex-col gap-6">
        <BookingCalendar
          onDateTimeSelect={handleDateTimeSelect}
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
        />
        <RoomList
          selectedRoomId={selectedRoom?.id || null}
          onRoomSelect={handleRoomSelect}
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
        />
      </div>
      
      {/* Right Column - Room Details and Booking Form */}
      <div className="flex flex-col gap-6">
        <RoomDetails room={selectedRoom} />
        <BookingForm
          selectedRoom={selectedRoom}
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          onComplete={handleBookingComplete}
        />
      </div>
    </div>
  );

  // Mobile layout with tabs
  const renderMobileLayout = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-4 w-full">
        <TabsTrigger value="calendar" className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Date</span>
        </TabsTrigger>
        <TabsTrigger value="rooms" className="flex items-center gap-1">
          <List className="h-4 w-4" />
          <span className="hidden sm:inline">Salles</span>
        </TabsTrigger>
        <TabsTrigger value="details" className="flex items-center gap-1">
          <Info className="h-4 w-4" />
          <span className="hidden sm:inline">Détails</span>
        </TabsTrigger>
        <TabsTrigger value="form" className="flex items-center gap-1">
          <ClipboardCheck className="h-4 w-4" />
          <span className="hidden sm:inline">Réserver</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="calendar" className="mt-0">
        <BookingCalendar
          onDateTimeSelect={handleDateTimeSelect}
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
        />
        
        {selectedDate && selectedTimeSlot && (
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={() => setActiveTab("rooms")}
              className="bg-booking-primary hover:bg-booking-dark"
            >
              Continuer
            </Button>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="rooms" className="mt-0">
        <RoomList
          selectedRoomId={selectedRoom?.id || null}
          onRoomSelect={handleRoomSelect}
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
        />
        
        {selectedRoom && (
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={() => setActiveTab("details")}
              className="bg-booking-primary hover:bg-booking-dark"
            >
              Continuer
            </Button>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="details" className="mt-0">
        <RoomDetails room={selectedRoom} />
        
        <div className="mt-4 flex justify-end">
          <Button 
            onClick={() => setActiveTab("form")}
            className="bg-booking-primary hover:bg-booking-dark"
          >
            Continuer
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="form" className="mt-0">
        <BookingForm
          selectedRoom={selectedRoom}
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          onComplete={handleBookingComplete}
        />
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="container py-6 min-h-screen">
      <div className="mb-6 flex items-center">
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold ml-4">Réservation de salle</h1>
      </div>

      {isMobile ? (
        renderMobileLayout()
      ) : (
        <div className="hidden md:block lg:hidden">
          {renderTabletLayout()}
        </div>
      )}

      <div className="hidden lg:block">
        {renderDesktopLayout()}
      </div>
    </div>
  );
};

export default BookingPage;
