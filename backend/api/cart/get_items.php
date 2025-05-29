<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
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

$query = "SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.image_url 
          FROM cart_items ci 
          JOIN products p ON ci.product_id = p.id 
          WHERE ci.user_id = :user_id";

$stmt = $db->prepare($query);
$stmt->bindParam(":user_id", $user_id);
$stmt->execute();

$cart_items = array();
$total = 0;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $item = array(
        "id" => $row['id'],
        "product_id" => $row['product_id'],
        "name" => $row['name'],
        "price" => floatval($row['price']),
        "quantity" => intval($row['quantity']),
        "image" => $row['image_url'],
        "subtotal" => floatval($row['price']) * intval($row['quantity'])
    );
    
    $cart_items[] = $item;
    $total += $item['subtotal'];
}

http_response_code(200);
echo json_encode(array(
    "items" => $cart_items,
    "total" => $total,
    "item_count" => count($cart_items)
));
?>
