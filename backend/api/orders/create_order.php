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

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(array("message" => "Usuário não autenticado."));
    exit();
}

$user_id = $_SESSION['user_id'];

try {
    $db->beginTransaction();
    
    // Buscar itens do carrinho
    $cart_query = "SELECT ci.product_id, ci.quantity, p.price 
                   FROM cart_items ci 
                   JOIN products p ON ci.product_id = p.id 
                   WHERE ci.user_id = :user_id";
    $cart_stmt = $db->prepare($cart_query);
    $cart_stmt->bindParam(":user_id", $user_id);
    $cart_stmt->execute();
    
    if ($cart_stmt->rowCount() == 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Carrinho vazio."));
        exit();
    }
    
    $cart_items = $cart_stmt->fetchAll(PDO::FETCH_ASSOC);
    $total_amount = 0;
    
    // Calcular total
    foreach ($cart_items as $item) {
        $total_amount += $item['price'] * $item['quantity'];
    }
    
    // Criar pedido
    $order_query = "INSERT INTO orders SET user_id=:user_id, total_amount=:total_amount, status='pending'";
    $order_stmt = $db->prepare($order_query);
    $order_stmt->bindParam(":user_id", $user_id);
    $order_stmt->bindParam(":total_amount", $total_amount);
    $order_stmt->execute();
    
    $order_id = $db->lastInsertId();
    
    // Adicionar itens do pedido
    foreach ($cart_items as $item) {
        $item_query = "INSERT INTO order_items SET order_id=:order_id, product_id=:product_id, quantity=:quantity, price=:price";
        $item_stmt = $db->prepare($item_query);
        $item_stmt->bindParam(":order_id", $order_id);
        $item_stmt->bindParam(":product_id", $item['product_id']);
        $item_stmt->bindParam(":quantity", $item['quantity']);
        $item_stmt->bindParam(":price", $item['price']);
        $item_stmt->execute();
    }
    
    // Limpar carrinho
    $clear_query = "DELETE FROM cart_items WHERE user_id = :user_id";
    $clear_stmt = $db->prepare($clear_query);
    $clear_stmt->bindParam(":user_id", $user_id);
    $clear_stmt->execute();
    
    $db->commit();
    
    http_response_code(201);
    echo json_encode(array(
        "message" => "Pedido criado com sucesso.",
        "order_id" => $order_id,
        "total_amount" => $total_amount
    ));
    
} catch (Exception $e) {
    $db->rollback();
    http_response_code(503);
    echo json_encode(array("message" => "Erro ao criar pedido: " . $e->getMessage()));
}
?>
