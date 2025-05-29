<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, name, description, price, category, certification, location, image_url, stock_quantity 
          FROM products 
          WHERE stock_quantity > 0 
          ORDER BY created_at DESC";

$stmt = $db->prepare($query);
$stmt->execute();

$products = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $product = array(
        "id" => $row['id'],
        "name" => $row['name'],
        "description" => $row['description'],
        "price" => floatval($row['price']),
        "category" => $row['category'],
        "certification" => $row['certification'],
        "location" => $row['location'],
        "image" => $row['image_url'],
        "stock" => intval($row['stock_quantity'])
    );
    
    $products[] = $product;
}

http_response_code(200);
echo json_encode(array(
    "products" => $products,
    "count" => count($products)
));
?>
