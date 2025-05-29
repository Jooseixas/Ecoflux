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

if (!empty($data->email) && !empty($data->password)) {
    
    $query = "SELECT id, first_name, last_name, email, password, company FROM users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $data->email);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (password_verify($data->password, $row['password'])) {
            // Iniciar sessão
            session_start();
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['user_email'] = $row['email'];
            $_SESSION['user_name'] = $row['first_name'] . ' ' . $row['last_name'];
            
            http_response_code(200);
            echo json_encode(array(
                "message" => "Login realizado com sucesso.",
                "user" => array(
                    "id" => $row['id'],
                    "name" => $row['first_name'] . ' ' . $row['last_name'],
                    "email" => $row['email'],
                    "company" => $row['company']
                ),
                "session_id" => session_id()
            ));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Senha incorreta."));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Email não encontrado."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Email e senha são obrigatórios."));
}
?>
