<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

session_start();

$database = new Database();
$db = $database->getConnection();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(array("message" => "Usuário não autenticado."));
    exit();
}

$user_id = $_SESSION['user_id'];

$query = "DELETE FROM cart_items WHERE user_id = :user_id";
$stmt = $db->prepare($query);
$stmt->bindParam(":user_id", $user_id);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(array("message" => "Carrinho limpo com sucesso."));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Erro ao limpar carrinho."));
}
?>
