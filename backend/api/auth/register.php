<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->first_name) && !empty($data->last_name) && !empty($data->email) && !empty($data->password)) {
    
    // Verificar se o email já existe
    $check_query = "SELECT id FROM users WHERE email = :email";
    $check_stmt = $db->prepare($check_query);
    $check_stmt->bindParam(":email", $data->email);
    $check_stmt->execute();
    
    if ($check_stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Email já está em uso."));
        exit();
    }
    
    $query = "INSERT INTO users SET first_name=:first_name, last_name=:last_name, email=:email, password=:password, company=:company, role=:role, company_size=:company_size, phone=:phone";
    
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(":first_name", $data->first_name);
    $stmt->bindParam(":last_name", $data->last_name);
    $stmt->bindParam(":email", $data->email);
    
    $password_hash = password_hash($data->password, PASSWORD_BCRYPT);
    $stmt->bindParam(":password", $password_hash);
    
    $stmt->bindParam(":company", $data->company);
    $stmt->bindParam(":role", $data->role);
    $stmt->bindParam(":company_size", $data->company_size);
    $stmt->bindParam(":phone", $data->phone);
    
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(array(
            "message" => "Usuário criado com sucesso.",
            "user_id" => $db->lastInsertId()
        ));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Não foi possível criar o usuário."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Dados incompletos."));
}
?>
