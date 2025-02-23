// Room Service Object
const RoomService = {
    roomTypes: {
        ordinary: {
            name: "Ordinary Room",
            basePrice: 100,
            amenities: ["Basic WiFi", "TV", "Air Conditioning"],
            maxGuests: 2
        },
        deluxe: {
            name: "Deluxe Room",
            basePrice: 150,
            amenities: ["High-speed WiFi", "Smart TV", "Mini Bar", "City View"],
            maxGuests: 3
        },
        suite: {
            name: "Executive Suite",
            basePrice: 250,
            amenities: ["Premium WiFi", "4K TV", "Full Bar", "River View", "Butler Service"],
            maxGuests: 4
        }
    },

    calculatePrice: function(roomType, nights, guests) {
        const room = this.roomTypes[roomType];
        if (!room) return 0;
        
        let price = room.basePrice;
        // Add 25% for each additional guest beyond 1
        if (guests > 1) {
            price += (price * 0.25 * (guests - 1));
        }
        return price * nights;
    },

    getRoomInfo: function(roomType) {
        return this.roomTypes[roomType] || null;
    },

    getAmenities: function(roomType) {
        const room = this.roomTypes[roomType];
        return room ? room.amenities : [];
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Get form elements
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const roomTypeSelect = document.getElementById('roomType');
    const guestsSelect = document.getElementById('guests');

    // Set minimum date for check-in to today
    const today = new Date().toISOString().split('T')[0];
    if (checkInInput) {
        checkInInput.min = today;
        
        // Update check-out minimum date when check-in date changes
        checkInInput.addEventListener('change', () => {
            const checkInDate = new Date(checkInInput.value);
            const minCheckOutDate = new Date(checkInDate);
            minCheckOutDate.setDate(checkInDate.getDate() + 1);
            checkOutInput.min = minCheckOutDate.toISOString().split('T')[0];
            
            // Clear check-out date if it's before new check-in date
            if (checkOutInput.value && new Date(checkOutInput.value) <= checkInDate) {
                checkOutInput.value = '';
            }
        });
    }

    // Room type selection handler
    if (roomTypeSelect) {
        roomTypeSelect.addEventListener('change', (e) => {
            const selectedRoom = e.target.value;
            const roomInfo = RoomService.getRoomInfo(selectedRoom);
            
            if (roomInfo) {
                updateGuestsOptions(roomInfo.maxGuests);
                updateAmenitiesDisplay(selectedRoom);
            }
        });
    }

    // Form submission handler
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmit);
    }

    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Helper Functions
function updateGuestsOptions(maxGuests) {
    const guestsSelect = document.getElementById('guests');
    if (!guestsSelect) return;

    const currentValue = guestsSelect.value;
    guestsSelect.innerHTML = '<option value="">Select Guests</option>';
    
    for (let i = 1; i <= maxGuests; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} Guest${i > 1 ? 's' : ''}`;
        guestsSelect.appendChild(option);
    }

    if (currentValue && currentValue <= maxGuests) {
        guestsSelect.value = currentValue;
    }
}

function updateAmenitiesDisplay(roomType) {
    const amenitiesContainer = document.querySelector('.amenities-list');
    if (!amenitiesContainer) return;

    const amenities = RoomService.getAmenities(roomType);
    amenitiesContainer.innerHTML = `
        <h3>Room Amenities:</h3>
        <ul>
            ${amenities.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return false;
    }

    const formData = collectFormData();
    const queryString = createQueryString(formData);
    window.location.href = `display-booking.html?${queryString}`;
    
    return false;
}

function validateForm() {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;
    const roomType = document.getElementById('roomType').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!checkIn || !checkOut || !guests || !roomType || !firstName || !lastName || !email || !phone) {
        alert('Please fill in all required fields');
        return false;
    }

    // Check if check-out date is after check-in date
    if (new Date(checkOut) <= new Date(checkIn)) {
        alert('Check-out date must be after check-in date');
        return false;
    }

    // If validation passes, allow form submission
    return true;
}

function collectFormData() {
    return {
        checkIn: document.getElementById('checkIn').value,
        checkOut: document.getElementById('checkOut').value,
        guests: document.getElementById('guests').value,
        roomType: document.getElementById('roomType').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        requests: document.getElementById('requests').value
    };
}

function createQueryString(data) {
    return Object.keys(data)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
}