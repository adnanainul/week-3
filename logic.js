
        // Form validation functions
        function validateName(name) {
            const nameRegex = /^[a-zA-Z\s]{2,50}$/;
            return nameRegex.test(name.trim());
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email.trim());
        }

        function validateSubject(subject) {
            return subject.trim().length >= 3 && subject.trim().length <= 100;
        }

        function validateMessage(message) {
            return message.trim().length >= 10 && message.trim().length <= 1000;
        }

        // Show error message
        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + 'Error');
            
            field.classList.add('input-error');
            field.classList.remove('input-success');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        // Show success state
        function showSuccess(fieldId) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + 'Error');
            
            field.classList.remove('input-error');
            field.classList.add('input-success');
            errorElement.style.display = 'none';
        }

        // Clear all errors
        function clearErrors() {
            const fields = ['name', 'email', 'subject', 'message'];
            fields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                const errorElement = document.getElementById(fieldId + 'Error');
                
                field.classList.remove('input-error', 'input-success');
                errorElement.style.display = 'none';
            });
        }

        // Show popup
        function showPopup() {
            const popup = document.getElementById('thankYouPopup');
            const overlay = document.getElementById('popupOverlay');
            
            popup.classList.add('show');
            overlay.classList.add('show');
        }

        // Close popup
        function closePopup() {
            const popup = document.getElementById('thankYouPopup');
            const overlay = document.getElementById('popupOverlay');
            
            popup.classList.remove('show');
            overlay.classList.remove('show');
        }

        // Clear form
        function clearForm() {
            document.getElementById('contactForm').reset();
            clearErrors();
        }

        // Show success message
        function showSuccessMessage() {
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            
            // Hide after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }

        // Main form validation
        function validateForm() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            let isValid = true;
            
            // Clear previous errors
            clearErrors();
            
            // Validate name
            if (!name.trim()) {
                showError('name', 'Name is required');
                isValid = false;
            } else if (!validateName(name)) {
                showError('name', 'Please enter a valid name (2-50 characters, letters only)');
                isValid = false;
            } else {
                showSuccess('name');
            }
            
            // Validate email
            if (!email.trim()) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                showSuccess('email');
            }
            
            // Validate subject
            if (!subject.trim()) {
                showError('subject', 'Subject is required');
                isValid = false;
            } else if (!validateSubject(subject)) {
                showError('subject', 'Subject must be between 3-100 characters');
                isValid = false;
            } else {
                showSuccess('subject');
            }
            
            // Validate message
            if (!message.trim()) {
                showError('message', 'Message is required');
                isValid = false;
            } else if (!validateMessage(message)) {
                showError('message', 'Message must be between 10-1000 characters');
                isValid = false;
            } else {
                showSuccess('message');
            }
            
            return isValid;
        }

        // Form submission handler
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show success message
                showSuccessMessage();
                
                // Show thank you popup
                setTimeout(() => {
                    showPopup();
                }, 500);
                
                // Clear form after successful submission
                setTimeout(() => {
                    clearForm();
                }, 1000);
                
                // Log form data (in real application, this would be sent to server)
                console.log('Form submitted successfully:', {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                });
            }
        });

        // Real-time validation on input
        document.getElementById('name').addEventListener('blur', function() {
            const name = this.value;
            if (name.trim() && !validateName(name)) {
                showError('name', 'Please enter a valid name (2-50 characters, letters only)');
            } else if (name.trim() && validateName(name)) {
                showSuccess('name');
            }
        });

        document.getElementById('email').addEventListener('blur', function() {
            const email = this.value;
            if (email.trim() && !validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
            } else if (email.trim() && validateEmail(email)) {
                showSuccess('email');
            }
        });

        document.getElementById('subject').addEventListener('blur', function() {
            const subject = this.value;
            if (subject.trim() && !validateSubject(subject)) {
                showError('subject', 'Subject must be between 3-100 characters');
            } else if (subject.trim() && validateSubject(subject)) {
                showSuccess('subject');
            }
        });

        document.getElementById('message').addEventListener('blur', function() {
            const message = this.value;
            if (message.trim() && !validateMessage(message)) {
                showError('message', 'Message must be between 10-1000 characters');
            } else if (message.trim() && validateMessage(message)) {
                showSuccess('message');
            }
        });

        // Close popup when clicking overlay
        document.getElementById('popupOverlay').addEventListener('click', closePopup);

        // Close popup with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
  