
// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Açaí ",
        description: "Açaí com morango, banana, kwi, ameixa, mirtilo" ,
        price: 25.00,
        image: "image/Açai.jpg"
    },
    {
        id: 2,
        name: "Bolo de Brigadeiro ",
        description: "Bolo de brigadeiro branco e preto" ,
        price: 80.00,
        image: "image/Bolo de Brigadeiro Branco e Preto.jpg"
    },
    {
        id: 3,
        name: "Bolo de Pote",
        description: "Bolo de chocolate com morango chantilly" ,
        price: 12.50,
        image: "image/Bolo de pote de morango.jpg"
    },
    {
        id: 4,
        name: "Bolo do Stitch ",
        description: "Bolo de uva com chantilly" ,
        price: 75.00,
        image: "image/Bolo do Stitch.jpg"
    },
    {
        id: 5,
        name: "Bolo naked cake",
        description: "Bolo de Brigadeiro Branco e Preto com morango" ,
        price: 106.00,
        image: "image/Bolo naked cake.jpg"
    },
    {
        id: 6,
        name: "Cupcake ",
        description: "Bolo de chocolate com brigadeiro" ,
        price: 10.00,
        image: "image/Cupcake de chocolate.jpg"
    },
    {
        id: 7,
        name: "Donunts ",
        description: "Rosquinha com cobertura de morango" ,
        price: 16.59,
        image: "image/Donunts de Morango.avif"
    },
    {
        id: 8,
        name: "Macarons",
        description: "Macarons de baunilha, chocolate, morango" ,
        price: 18.00,
        image: "image/Macarons.jpg"
    },
    {
        id: 9,
        name: "Milkshake ",
        description: "Milkshake de oreo" ,
        price: 25.00,
        image: "image/Milkshake de Oreo.jpg"
    },
    {
        id: 10,
        name: "Morango do Amor",
        description: "Bombom de morango com calda e brigadeiro " ,
        price: 17.99,
        image: "image/Morango do Amor.jpg"
    },
    {
        id: 7,
        name: "Sorvete ",
        description: "Sorvete com morango" ,
        price: 22.00,
        image: "image/Sorvete de Morango.jpg"
    },
];

// Estado do carrinho
let cart = [];

// Elementos DOM
const productsGrid = document.getElementById('products-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});

// Renderizar produtos
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description"> ${product.description || ''}</p>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Adicionar event listeners aos botões
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Adicionar produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Verificar se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Remover produto do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Atualizar carrinho
function updateCart() {
    // Atualizar contador
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar lista de itens
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="cart-item-remove" data-id="${item.id}">Remover</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Atualizar total
    cartTotal.textContent = total.toFixed(2);
    
    // Adicionar event listeners aos botões de remover
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        transition: transform 0.3s, opacity 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateY(20px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Abrir/fechar carrinho
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});