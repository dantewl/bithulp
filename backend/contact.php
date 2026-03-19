<?php
// BitHulp - Contact Form Handler
// Verwerk het contactformulier en stuur een e-mail

header('Content-Type: text/html; charset=UTF-8');

// Alleen POST verzoeken accepteren
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../contact.html');
    exit;
}

// Gegevens ophalen en opschonen
$naam    = htmlspecialchars(strip_tags(trim($_POST['naam'] ?? '')));
$email   = htmlspecialchars(strip_tags(trim($_POST['email'] ?? '')));
$telefoon = htmlspecialchars(strip_tags(trim($_POST['telefoon'] ?? '')));
$bericht = htmlspecialchars(strip_tags(trim($_POST['bericht'] ?? '')));

// Validatie
$errors = [];

if (empty($naam)) {
    $errors[] = 'Naam is verplicht.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Een geldig e-mailadres is verplicht.';
}

if (empty($bericht)) {
    $errors[] = 'Bericht is verplicht.';
}

// Als er fouten zijn, terug naar contactpagina
if (!empty($errors)) {
    $errorString = urlencode(implode(', ', $errors));
    header('Location: ../contact.html?error=' . $errorString);
    exit;
}

// E-mail configuratie
$to      = 'info@bithulp.nl'; // Verander dit naar uw e-mailadres
$subject = 'Nieuw contactverzoek van ' . $naam;

$message = "Nieuw bericht via het contactformulier van BitHulp\n\n";
$message .= "Naam: $naam\n";
$message .= "E-mail: $email\n";
if (!empty($telefoon)) {
    $message .= "Telefoon: $telefoon\n";
}
$message .= "\nBericht:\n$bericht\n";
$message .= "\n---\nVerzonden via BitHulp contactformulier";

$headers  = "From: noreply@bithulp.nl\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// E-mail versturen
$mailSent = mail($to, $subject, $message, $headers);

if ($mailSent) {
    // Succes - stuur bevestiging terug
    header('Location: ../contact.html?success=1');
} else {
    // Fout bij verzenden
    header('Location: ../contact.html?error=mail_failed');
}

exit;
?>
