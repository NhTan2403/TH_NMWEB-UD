
// --- 1. DỮ LIỆU SẢN PHẨM ---
const products = [
    { id: 1, name: "Laptop Asus TUF Gaming", brand: "Asus", desc: "Intel Core i5, 11400H, 8GB RAM", price: 17490000, img: "images/LaptopAsusTUFGaming.jpg" },
    { id: 2, name: "Laptop Dell Inspiron 15", brand: "Dell", desc: "i5 1235U, 16GB, 512GB", price: 15490000, img: "images/LaptopDellInspiron15.jpg" },
    { id: 3, name: "Lenovo IdeaPad Gaming 3", brand: "Lenovo", desc: "i5-10300H, RAM 8GB", price: 19500000, img: "images/LenovoIdeaPadGaming 3.jpg" },
    { id: 4, name: "Asus ROG STRIX", brand: "Asus", desc: "Core i7 NVIDIA RTX 950M - 4G", price: 11900000, img: "images/ASUSROGTRIX.jpg" }, // Thêm lại ID 4 bị thiếu ở đây
    { id: 5, name: "MacBook Air M2", brand: "Apple", desc: "Apple M2, 8GB, 256GB", price: 24900000, img: "images/Macbookm2.jpg" },
    { id: 6, name: "HP Pavilion 15", brand: "HP", desc: "Ryzen 5, 8GB RAM, 512GB", price: 14500000, img: "images/HPPavilion15.jpg" },
    { id: 7, name: "Acer Nitro 5", brand: "Acer", desc: "Core i7, RTX 3050, 16GB", price: 21900000, img: "images/AcerNitro5.jpg" },
    { id: 9, name: "LG Gram Style", brand: "LG", desc: "Core i5, 16GB, 512GB siêu nhẹ", price: 32000000, img: "images/LGGramStyle.jpg" }
];
// --- 2. DỮ LIỆU LABS ---
const labs = [
    {
        id: 1, title: "Lab 01: HTML cơ bản",
        links: [
            { name: "Bài 3", url: "Vi_du/lab1_bai3.html" },
            { name: "Bài 4", url: "Vi_du/Lab1_bai4.html" },
            { name: "Index", url: "Vi_du/index.html" }
        ]
    },
    {
        id: 2, title: "Lab 02: Table & List",
        links: [
            { name: "Bài 1", url: "Lab02/lab02_bai1.html" },
            { name: "Bài 2", url: "Lab02/lab02_bai2.html" },
            { name: "Khung Table", url: "Lab02/lab02_khung_table.html" }
        ]
    },
    {
        id: 3, title: "Lab 03: Form & Frame",
        links: [
            { name: "Bài 1", url: "lab03/Vi_du_Lab03.1/lab03_bai1.html" },
            { name: "Bài 2", url: "lab03/Vi_du_lab03/lab03_bai2.html" }
        ]
    },
    {
        id: 4, title: "Lab 04: CSS cơ bản",
        links: [
            { name: "Bài 4.1", url: "lab04/Vi_du_lab4/lab04_bai1.html" },
            { name: "Bài 4.2", url: "lab04/Vi_du_lab4/lab04_bai2.html" },
            { name: "Bài 4.3", url: "lab04/Vi_du_lab4/lab04_bai3.html" }
        ]
    },
    {
        id: 5, title: "Lab 05: CSS Layout",
        links: [
            { name: "Menu", url: "Bai_2_lab5/lab5_menu.html" },
            { name: "Giao diện chính", url: "Bai_2_lab5/index.html" }
        ]
    },
    {
        id: 6, title: "Lab 06: Responsive Layout",
        links: [
            { name: "Ví dụ", url: "TH_Web_Lab06/TH_Web_Lab06/Vi_du/index.html" },
            { name: "Minh họa Layout", url: "TH_Web_Lab06/TH_Web_Lab06/Bai_2_Minh_hoa_layout/index.html" }
        ]
    },
    {
        id: 7, title: "Lab 07: Javascript",
        links: [
            { name: "Bài 1", url: "Lab07/LAB7_bai1.html" },
            { name: "Bài 2 (Demo)", url: "Lab07/demo_bai_2/index.html" }
        ]
    },
    {
        id: 8, title: "Lab 08: JS nâng cao",
        links: [
            { name: "Slider", url: "Lab08/Vi_du_1/lab08_slider.html" },
            { name: "Slider Auto", url: "Lab08/Vi_du_1/lab08_slider_auto.html" },
            { name: "Ví dụ 2", url: "Lab08/Vi_du_2/index.html" }
        ]
    }
];

// --- 3. KHỞI TẠO BIẾN DÙNG CHUNG ---

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const labGrid = document.getElementById('lab-grid');
const githubBase = "https://nhtan2403.github.io/TH_NMWEB-UD/";

// --- 4. CÁC HÀM TIỆN ÍCH ---
const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ';

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) countElement.innerText = cart.length;
}

function addToCart(id, event) {
    if (event) event.stopPropagation();
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    }
}

function goToDetail(id) {
    localStorage.setItem('selectedProductId', id);
    window.location.href = 'detail.html';
}

// --- 5. RENDER GIAO DIỆN ---

// Render danh sách sản phẩm
function displayProducts(productsArray) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    if (productsArray.length === 0) {
        productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 50px;">Không tìm thấy sản phẩm nào!</p>`;
        return;
    }

    productGrid.innerHTML = productsArray.map(p => `
        <div class="card" onclick="goToDetail(${p.id})">
            <span class="badge">Laptop</span>
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <div class="price">${formatPrice(p.price)}</div>
            <button class="btn-outline" onclick="addToCart(${p.id}, event)">🛒 Thêm giỏ hàng</button>
        </div>
    `).join('');
}

// Render trang Labs (Bản nâng cấp nhiều nút bấm)
if (labGrid) {
    labGrid.innerHTML = labs.map(lab => `
        <div class="lab-card" style="border: 1px solid #ddd; padding: 20px; border-radius: 15px; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h3 style="color: #333; margin-bottom: 15px; border-bottom: 2px solid #ffb703; padding-bottom: 5px;">${lab.title}</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                ${lab.links.map(link => `
                    <a href="${githubBase}${link.url}" target="_blank" 
                       style="text-decoration: none; background: #f8f9fa; color: #ffb703; border: 1px solid #ffb703; padding: 5px 12px; border-radius: 20px; font-size: 13px; font-weight: 500; transition: 0.3s;"
                       onmouseover="this.style.background='#ffb703'; this.style.color='white'"
                       onmouseout="this.style.background='#f8f9fa'; this.style.color='#ffb703'">
                       ${link.name}
                    </a>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Render chi tiết sản phẩm (Nếu đang ở trang detail.html)
const detailContainer = document.getElementById('detail-container');
if (detailContainer) {
    const selectedId = localStorage.getItem('selectedProductId');
    const product = products.find(p => p.id == selectedId) || products[0];

    detailContainer.innerHTML = `
        <div class="detail-image"><img src="${product.img}" alt="${product.name}"></div>
        <div class="detail-info">
            <h2>${product.name}</h2>
            <p>Hãng: <b>${product.brand}</b></p>
            <p class="price-large">${formatPrice(product.price)}</p>
            <p><strong>Cấu hình:</strong> ${product.desc}</p>
            <br>
            <p><em>Mô tả: Sản phẩm chính hãng Apple Silicon M3 mạnh mẽ, phân phối tại LaptopShop.</em></p>
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn-buy" onclick="showQR()">Thanh toán ngay</button>
                <button class="btn-outline" onclick="addToCart(${product.id}, event)" style="background: white; border: 1px solid #82c91e; color: #82c91e;">🛒 Giỏ hàng</button>
            </div>
        </div>
    `;
}

// --- 6. LOGIC LỌC SẢN PHẨM ---
function filterProducts() {
    const selectedBrands = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"]:checked'))
        .map(cb => cb.value.toLowerCase());

    const selectedPriceRange = document.querySelector('input[name="price"]:checked')?.value;

    const filtered = products.filter(p => {
        const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand.toLowerCase());

        let matchPrice = true;
        if (selectedPriceRange === "under10") matchPrice = p.price < 10000000;
        else if (selectedPriceRange === "10to20") matchPrice = p.price >= 10000000 && p.price <= 20000000;
        else if (selectedPriceRange === "above20") matchPrice = p.price > 20000000;

        return matchBrand && matchPrice;
    });

    displayProducts(filtered);
}

function clearFilters() {
    document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[name="price"]').forEach(r => r.checked = false);
    displayProducts(products);
}

// --- 7. MODAL QR ---
function showQR() {
    const modal = document.getElementById('qrModal');
    if (modal) modal.style.display = 'flex';
}
function closeQR() {
    const modal = document.getElementById('qrModal');
    if (modal) modal.style.display = 'none';
}

// --- 8. CHẠY KHI LOAD TRANG ---
displayProducts(products);
updateCartCount();