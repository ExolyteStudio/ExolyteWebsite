// Pricing Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 1;
    let selectedType = null;
    let selectedFeatures = [];
    let basePrice = 0;

    const steps = document.querySelectorAll('.form-step');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const orderBtn = document.getElementById('order-btn');

    // Project type selection
    document.querySelectorAll('.project-type').forEach(type => {
        type.addEventListener('click', function() {
            document.querySelectorAll('.project-type').forEach(t => t.classList.remove('selected'));
            this.classList.add('selected');
            selectedType = this.getAttribute('data-type');
            basePrice = parseInt(this.getAttribute('data-price'));
            updateSummary();
        });
    });

    // Feature selection
    document.querySelectorAll('.feature-checkbox input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const featurePrice = parseInt(this.getAttribute('data-price'));
            const featureName = this.nextElementSibling.querySelector('span').textContent;
            
            if (this.checked) {
                selectedFeatures.push({
                    name: featureName,
                    price: featurePrice
                });
            } else {
                selectedFeatures = selectedFeatures.filter(f => f.name !== featureName);
            }
            updateSummary();
        });
    });

    // Navigation
    nextBtn.addEventListener('click', function() {
        if (currentStep === 1 && !selectedType) {
            alert('Proszę wybrać typ projektu');
            return;
        }

        if (currentStep < 3) {
            steps[currentStep - 1].classList.remove('active');
            currentStep++;
            steps[currentStep - 1].classList.add('active');
            updateNavigation();
        }
    });

    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            steps[currentStep - 1].classList.remove('active');
            currentStep--;
            steps[currentStep - 1].classList.add('active');
            updateNavigation();
        }
    });

    function updateNavigation() {
        prevBtn.style.display = currentStep > 1 ? 'inline-block' : 'none';
        
        if (currentStep === 3) {
            nextBtn.style.display = 'none';
            orderBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            orderBtn.style.display = 'none';
        }
    }

    function updateSummary() {
        const typeElement = document.getElementById('summary-type');
        const featuresElement = document.getElementById('summary-features');
        const totalElement = document.getElementById('summary-total');

        // Update type
        if (selectedType) {
            const typeNames = {
                'wizytowka': 'Strona Wizytówka',
                'firmowa': 'Strona Firmowa',
                'sklep': 'Sklep Internetowy',
                'inne': 'Inny Projekt'
            };
            typeElement.textContent = typeNames[selectedType];
        }

        // Update features
        if (selectedFeatures.length > 0) {
            featuresElement.textContent = selectedFeatures.map(f => f.name.split('(+')[0].trim()).join(', ');
        } else {
            featuresElement.textContent = 'Brak dodatkowych funkcji';
        }

        // Calculate total
        let total = basePrice;
        selectedFeatures.forEach(feature => {
            total += feature.price;
        });

        totalElement.textContent = total > 0 ? total + ' zł' : 'Indywidualna wycena';
    }

    // Add some interactive effects
    document.querySelectorAll('.project-type').forEach(type => {
        type.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        type.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
    });
});