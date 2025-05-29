
import React from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { toast } from '@/hooks/use-toast';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de finalizar a compra.",
        variant: "destructive"
      });
      return;
    }

    console.log('Checkout initiated with items:', cartItems);
    toast({
      title: "Compra realizada!",
      description: `Parabéns! Você compensou ${cartItems.reduce((sum, item) => sum + item.quantity, 0)} toneladas de CO².`,
    });
    
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-green-800 flex items-center">
              <ShoppingBag className="mr-2" size={24} />
              Carrinho
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto mb-4 text-gray-300" size={48} />
              <p className="text-gray-500">Seu carrinho está vazio</p>
              <button
                onClick={onClose}
                className="mt-4 text-green-600 hover:text-green-700 font-semibold"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-green-800 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <p className="text-lg font-bold text-green-600">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-gray-200 pt-6">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de processamento:</span>
                    <span>R$ 5.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-green-800 border-t pt-2">
                    <span>Total:</span>
                    <span>R$ {(getTotal() + 5).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200"
                  >
                    <CreditCard size={20} />
                    <span>Finalizar Compra</span>
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Impacto Ambiental</h4>
                <p className="text-sm text-green-700">
                  Você está compensando{' '}
                  <span className="font-bold">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)} toneladas de CO²
                  </span>
                  , equivalente a plantar{' '}
                  <span className="font-bold">
                    {(cartItems.reduce((sum, item) => sum + item.quantity, 0) * 40).toFixed(0)} árvores
                  </span>
                  !
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
