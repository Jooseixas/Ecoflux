<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

session_start();

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(array("message" => "Usuário não autenticado."));
    exit();
}

if (!empty($data->cart_item_id) && isset($data->quantity)) {
    
    $user_id = $_SESSION['user_id'];
    
    if ($data->quantity <= 0) {
        // Remover item se quantidade for 0 ou menor
        $delete_query = "DELETE FROM cart_items WHERE id = :id AND user_id = :user_id";
        $delete_stmt = $db->prepare($delete_query);
        $delete_stmt->bindParam(":id", $data->cart_item_id);
        $delete_stmt->bindParam(":user_id", $user_id);
        
        if ($delete_stmt->execute()) {
            http_response_code(200);
            echo json_encode(array("message" => "Item removido do carrinho."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Erro ao remover item."));
        }
    } else {
        // Atualizar quantidade
        $update_query = "UPDATE cart_items SET quantity = :quantity WHERE id = :id AND user_id = :user_id";
        $update_stmt = $db->prepare($update_query);
        $update_stmt->bindParam(":quantity", $data->quantity);
        $update_stmt->bindParam(":id", $data->cart_item_id);
        $update_stmt->bindParam(":user_id", $user_id);
        
        if ($update_stmt->execute()) {
            http_response_code(200);
            echo json_encode(array("message" => "Quantidade atualizada."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Erro ao atualizar quantidade."));
        }
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Dados incompletos."));
}
?>
