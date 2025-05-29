-- Criação do banco de dados EcoFlux
CREATE DATABASE IF NOT EXISTS ecoflux;
USE ecoflux;

-- Tabela de usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    role VARCHAR(100),
    company_size ENUM('1-10', '11-50', '51-200', '201-1000', '1000+'),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de produtos (créditos de carbono)
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    certification VARCHAR(100),
    location VARCHAR(255),
    image_url VARCHAR(500),
    stock_quantity INT DEFAULT 1000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de pedidos
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de itens do pedido
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabela de carrinho
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- Inserir produtos padrão
INSERT INTO products (name, description, price, category, certification, location, image_url) VALUES
('Créditos Reflorestamento Amazônia', 'Projeto de reflorestamento na Amazônia com certificação VCS', 25.00, 'Reflorestamento', 'VCS', 'Amazônia, Brasil', '/placeholder.svg?height=300&width=400'),
('Energia Solar Nordeste', 'Parque solar no Nordeste brasileiro com tecnologia avançada', 30.00, 'Energia Renovável', 'Gold Standard', 'Ceará, Brasil', '/placeholder.svg?height=300&width=400'),
('Conservação Mata Atlântica', 'Projeto de conservação e restauração da Mata Atlântica', 35.00, 'Conservação', 'VCS', 'São Paulo, Brasil', '/placeholder.svg?height=300&width=400'),
('Energia Eólica Sul', 'Parque eólico no Sul do Brasil com alta eficiência', 28.00, 'Energia Renovável', 'Gold Standard', 'Rio Grande do Sul, Brasil', '/placeholder.svg?height=300&width=400'),
('Bioenergia Sustentável', 'Projeto de bioenergia a partir de resíduos agrícolas', 32.00, 'Bioenergia', 'VCS', 'Minas Gerais, Brasil', '/placeholder.svg?height=300&width=400'),
('Manejo Florestal Sustentável', 'Projeto de manejo sustentável de florestas nativas', 26.00, 'Manejo Florestal', 'Gold Standard', 'Pará, Brasil', '/placeholder.svg?height=300&width=400');
