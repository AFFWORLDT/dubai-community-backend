"use client"

import { useState } from "react"
import { Calendar, Users, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface BookingSearchBarProps {
  onSearch?: (data: {
    checkIn: Date | undefined
    checkOut: Date | undefined
    adults: number
    children: number
    rooms: number
  }) => void
}

export function BookingSearchBar({ onSearch }: BookingSearchBarProps) {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)

  const handleSearch = () => {
    onSearch?.({
      checkIn,
      checkOut,
      adults,
      children,
      rooms
    })
  }

  return (
    <div className="w-full bg-blue-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl border-2 border-yellow-400 p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {/* Date Selection */}
            <div className="flex-1 flex items-center gap-3 min-w-0">
              <Calendar className="w-6 h-6 text-gray-500 flex-shrink-0" />
              <div className="flex items-center gap-2 min-w-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "justify-start text-left font-normal h-auto p-0 hover:bg-transparent",
                        !checkIn && "text-gray-500"
                      )}
                    >
                      {checkIn ? format(checkIn, "MMM dd") : "Check-in date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                
                <span className="text-gray-400">—</span>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "justify-start text-left font-normal h-auto p-0 hover:bg-transparent",
                        !checkOut && "text-gray-500"
                      )}
                    >
                      {checkOut ? format(checkOut, "MMM dd") : "Check-out date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                      disabled={(date) => date <= (checkIn || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Separator */}
            <div className="hidden lg:block w-px h-12 bg-gray-200" />

            {/* Guest and Room Selection */}
            <div className="flex-1 flex items-center gap-3 min-w-0">
              <Users className="w-6 h-6 text-gray-500 flex-shrink-0" />
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-gray-900 whitespace-nowrap">
                  {adults} adults · {children} children · {rooms} room
                </span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0 hover:bg-transparent">
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Adults</p>
                          <p className="text-sm text-gray-500">Ages 13 or above</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            disabled={adults <= 1}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{adults}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setAdults(adults + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Children</p>
                          <p className="text-sm text-gray-500">Ages 0-12</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            disabled={children <= 0}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{children}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setChildren(children + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Rooms</p>
                          <p className="text-sm text-gray-500">Number of rooms</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setRooms(Math.max(1, rooms - 1))}
                            disabled={rooms <= 1}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{rooms}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setRooms(rooms + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 h-auto rounded-r-xl rounded-l-xl lg:rounded-l-none"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 