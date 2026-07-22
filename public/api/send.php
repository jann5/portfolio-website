<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false]);
    exit;
}

$payload = file_get_contents('php://input');
if ($payload === false || $payload === '') {
    http_response_code(400);
    echo json_encode(['success' => false]);
    exit;
}

$request = curl_init('https://jann5.vercel.app/api/send');
curl_setopt_array($request, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 20,
]);

$response = curl_exec($request);
$status = curl_getinfo($request, CURLINFO_RESPONSE_CODE);
curl_close($request);

if ($response === false || $status < 200 || $status >= 300) {
    http_response_code(500);
    echo json_encode(['success' => false]);
    exit;
}

http_response_code($status);
echo $response;
