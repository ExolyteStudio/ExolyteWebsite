<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Odbiorca wiadomości - ZMIEŃ NA SWÓJ ADRES E-MAIL!
    $to = "twoj.email@example.com";
    
    // Temat wiadomości
    $subject = "Nowe zamówienie strony - Exolyte Studios";
    
    // Zebranie danych z formularza
    $kontakt = htmlspecialchars($_POST['kontakt']);
    $projekt = htmlspecialchars($_POST['projekt']);
    $budzet = htmlspecialchars($_POST['budzet']);
    $opis = htmlspecialchars($_POST['opis']);
    $wymagania = htmlspecialchars($_POST['wymagania']);
    $uwagi = htmlspecialchars($_POST['uwagi']);
    
    // Sprawdzenie, czy uzupełniono pole "inne_szczegoly"
    $inne_szczegoly = "";
    if (isset($_POST['inne_szczegoly']) && !empty($_POST['inne_szczegoly'])) {
        $inne_szczegoly = htmlspecialchars($_POST['inne_szczegoly']);
    }
    
    // Budowanie treści wiadomości
    $message = "
    <html>
    <head>
        <title>Nowe zamówienie strony</title>
        <style>
            body { font-family: Arial, sans-serif; }
            .header { color: #e63946; font-size: 20px; font-weight: bold; margin-bottom: 20px; }
            .field { margin-bottom: 10px; }
            .field-name { font-weight: bold; color: #333; }
            .field-value { margin-left: 10px; }
        </style>
    </head>
    <body>
        <div class='header'>Nowe zamówienie strony - Exolyte Studios</div>
        
        <div class='field'>
            <span class='field-name'>Kontakt:</span>
            <span class='field-value'>$kontakt</span>
        </div>
        
        <div class='field'>
            <span class='field-name'>Typ projektu:</span>
            <span class='field-value'>$projekt</span>
        </div>
    ";
    
    // Jeśli wybrano "Inne", dodaj szczegóły
    if (!empty($inne_szczegoly)) {
        $message .= "
        <div class='field'>
            <span class='field-name'>Szczegóły projektu (Inne):</span>
            <span class='field-value'>$inne_szczegoly</span>
        </div>
        ";
    }
    
    $message .= "
        <div class='field'>
            <span class='field-name'>Budżet:</span>
            <span class='field-value'>$budzet zł</span>
        </div>
        
        <div class='field'>
            <span class='field-name'>Opis strony:</span>
            <span class='field-value'>$opis</span>
        </div>
        
        <div class='field'>
            <span class='field-name'>Wymagania funkcjonalne:</span>
            <span class='field-value'>$wymagania</span>
        </div>
    ";
    
    // Dodanie uwag, jeśli zostały podane
    if (!empty($uwagi)) {
        $message .= "
        <div class='field'>
            <span class='field-name'>Dodatkowe uwagi:</span>
            <span class='field-value'>$uwagi</span>
        </div>
        ";
    }
    
    $message .= "
    </body>
    </html>
    ";
    
    // Nagłówki e-mail
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Exolyte Studios <noreply@exolytestudios.pl>" . "\r\n";
    $headers .= "Reply-To: $kontakt" . "\r\n";
    
    // Wysłanie e-maila
    if (mail($to, $subject, $message, $headers)) {
        // Przekierowanie po udanym wysłaniu
        header('Location: dziekujemy.html');
        exit();
    } else {
        echo "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.";
    }
} else {
    // Jeśli ktoś próbuje dostać się do pliku bez wysłania formularza
    header('Location: zamowienie.html');
    exit();
}
?>