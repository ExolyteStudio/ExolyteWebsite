function toggleInne() {
    const projektSelect = document.getElementById('projekt');
    const inneGrupa = document.getElementById('inne-grupa');
    
    if (projektSelect.value === 'Inne') {
        inneGrupa.classList.remove('hidden');
    } else {
        inneGrupa.classList.add('hidden');
    }
}

// Dodatkowe funkcje dla formularza zamówienia
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Walidacja formularza
    const kontakt = document.getElementById('kontakt').value;
    const projekt = document.getElementById('projekt').value;
    const budzet = document.getElementById('budzet').value;
    const opis = document.getElementById('opis').value;
    const wymagania = document.getElementById('wymagania').value;
    
    if (!kontakt || !projekt || !budzet || !opis || !wymagania) {
        alert('Proszę wypełnić wszystkie wymagane pola oznaczone *');
        return;
    }
    
    // Tutaj możesz dodać kod do wysłania formularza
    // Na razie tylko symulacja wysłania
    alert('Dziękujemy za złożenie zamówienia! Skontaktujemy się z Tobą w ciągu 24 godzin.');
    this.reset();
    toggleInne(); // Reset ukrytego pola
});