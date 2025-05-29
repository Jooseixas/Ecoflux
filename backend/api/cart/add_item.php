<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
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

if (!empty($data->product_id) && !empty($data->quantity)) {
    
    $user_id = $_SESSION['user_id'];
    
    // Verificar se o produto existe
    $product_query = "SELECT id, name, price FROM products WHERE id = :product_id";
    $product_stmt = $db->prepare($product_query);
    $product_stmt->bindParam(":product_id", $data->product_id);
    $product_stmt->execute();
    
    if ($product_stmt->rowCount() == 0) {
        http_response_code(404);
        echo json_encode(array("message" => "Produto não encontrado."));
        exit();
    }
    
    // Verificar se o item já está no carrinho
    $check_query = "SELECT id, quantity FROM cart_items WHERE user_id = :user_id AND product_id = :product_id";
    $check_stmt = $db->prepare($check_query);
    $check_stmt->bindParam(":user_id", $user_id);
    $check_stmt->bindParam(":product_id", $data->product_id);
    $check_stmt->execute();
    
    if ($check_stmt->rowCount() > 0) {
        // Atualizar quantidade
        $existing = $check_stmt->fetch(PDO::FETCH_ASSOC);
        $new_quantity = $existing['quantity'] + $data->quantity;
        
        $update_query = "UPDATE cart_items SET quantity = :quantity WHERE id = :id";
        $update_stmt = $db->prepare($update_query);
        $update_stmt->bindParam(":quantity", $new_quantity);
        $update_stmt->bindParam(":id", $existing['id']);
        
        if ($update_stmt->execute()) {
            http_response_code(200);
            echo json_encode(array("message" => "Item atualizado no carrinho."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Erro ao atualizar item."));
        }
    } else {
        // Adicionar novo item
        $insert_query = "INSERT INTO cart_items SET user_id=:user_id, product_id=:product_id, quantity=:quantity";
        $insert_stmt = $db->prepare($insert_query);
        $insert_stmt->bindParam(":user_id", $user_id);
        $insert_stmt->bindParam(":product_id", $data->product_id);
        $insert_stmt->bindParam(":quantity", $data->quantity);
        
        if ($insert_stmt->execute()) {
            http_response_code(201);
            echo json_encode(array("message" => "Item adicionado ao carrinho."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Erro ao adicionar item."));
        }
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Dados incompletos."));
}
?>
