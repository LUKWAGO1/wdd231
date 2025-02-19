document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("reservation-form");

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        
        const checkIn = document.querySelector("input[name='check-in']").value;
        const checkOut = document.querySelector("input[name='check-out']").value;
        const roomType = document.querySelector("select[name='room-type']").value;
        
        if (!checkIn || !checkOut || !roomType) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        if (new Date(checkIn) >= new Date(checkOut)) {
            alert("Check-out date must be after check-in date.");
            return;
        }

        alert("Booking submitted successfully! We will contact you shortly.");
        bookingForm.submit(); // Proceed with form submission
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');

    // Set minimum date for check-in to today
    const today = new Date().toISOString().split('T')[0];
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

    // Form submission handling
    bookingForm.addEventListener('submit', handleFormSubmit);

    // Room type selection handling
    const roomTypeSelect = document.getElementById('roomType');
    const guestsSelect = document.getElementById('guests');

    roomTypeSelect.addEventListener('change', () => {
        // Update max guests based on room type
        const maxGuests = {
            'standard': 2,
            'deluxe': 3,
            'suite': 4,
            'presidential': 4
        };

        const selectedRoom = roomTypeSelect.value;
        if (selectedRoom) {
            const max = maxGuests[selectedRoom];
            updateGuestsOptions(max);
        }
    });

    function updateGuestsOptions(maxGuests) {
        const currentValue = guestsSelect.value;
        guestsSelect.innerHTML = '<option value="">Select</option>';
        
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

function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return false;
    }

    // Collect form data
    const formData = {
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

    // Create query string from form data
    const queryString = Object.keys(formData)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
        .join('&');

    // Redirect to display-booking.html with form data
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