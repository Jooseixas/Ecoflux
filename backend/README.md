# EcoFlux Backend API

## Configuração do Ambiente

### Pré-requisitos
- PHP 7.4 ou superior
- MySQL 5.7 ou superior
- Servidor web (Apache/Nginx) ou XAMPP/WAMP

### Instalação

1. **Configurar Banco de Dados:**
   - Abra o MySQL Workbench
   - Execute o script `database/schema.sql` para criar o banco e tabelas
   - Ajuste as credenciais em `config/database.php` se necessário

2. **Configurar Servidor:**
   - Coloque os arquivos na pasta do servidor web
   - Certifique-se que o PHP está configurado com PDO MySQL

### Endpoints da API

#### Autenticação
- `POST /api/auth/register.php` - Cadastro de usuário
- `POST /api/auth/login.php` - Login de usuário

#### Carrinho
- `GET /api/cart/get_items.php` - Buscar itens do carrinho
- `POST /api/cart/add_item.php` - Adicionar item ao carrinho
- `PUT /api/cart/update_item.php` - Atualizar quantidade do item
- `DELETE /api/cart/clear_cart.php` - Limpar carrinho

#### Produtos
- `GET /api/products/get_products.php` - Listar produtos

#### Pedidos
- `POST /api/orders/create_order.php` - Criar pedido

### Estrutura do Banco de Dados

- **users**: Dados dos usuários
- **products**: Catálogo de créditos de carbono
- **cart_items**: Itens no carrinho do usuário
- **orders**: Pedidos realizados
- **order_items**: Itens de cada pedido

### Segurança

- Senhas são criptografadas com password_hash()
- Sessões PHP para autenticação
- Validação de dados de entrada
- Prepared statements para prevenir SQL injection

### Configuração CORS

As APIs estão configuradas para aceitar requisições de qualquer origem.
Para produção, configure o CORS adequadamente.
