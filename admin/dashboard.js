document.getElementById('products-tab').addEventListener('click', function() {
    loadProducts();
});

document.getElementById('gallery-tab').addEventListener('click', function() {
    loadGallery();
});

function loadProducts() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Products</h2>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Nama Produk</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="product-table-body">
                    <!-- Produk akan dimuat di sini -->
                </tbody>
            </table>
        </div>
        <button onclick="addProduct()">Add Product</button>
    `;


    const productTableBody = document.getElementById('product-table-body');
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.foto}" alt="${product.nama}" width="50"></td>
            <td>${product.nama}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="editProduct(${index})">Edit</button>
                    <button class="delete" onclick="deleteProduct(${index})">Delete</button>
                </div>
            </td>
        `;
        productTableBody.appendChild(row);
    });
}

function loadGallery() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Gallery</h2>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Judul Kegiatan</th>
                        <th>Tahun Kegiatan</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="gallery-table-body">
                    <!-- Galeri akan dimuat di sini -->
                </tbody>
            </table>
        </div>
        <button onclick="addGalleryItem()">Add Gallery Item</button>
    `;

    const galleryTableBody = document.getElementById('gallery-table-body');
    gallery.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.foto}" alt="${item.judul}" width="50"></td>
            <td>${item.judul}</td>
            <td>${item.tahun}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="editGalleryItem(${index})">Edit</button>
                    <button class="delete" onclick="deleteGalleryItem(${index})">Delete</button>
                </div>
            </td>
        `;
        galleryTableBody.appendChild(row);
    });
}

function logout() {
    window.location.href = 'login.html';
}

function addProduct() {
    // Implementasi fungsi untuk menambah produk baru
    alert('Add Product');
}

function editProduct(index) {
    // Implementasi fungsi untuk mengedit produk
    alert(`Edit Product ${index}`);
}

function deleteProduct(index) {
    // Implementasi fungsi untuk menghapus produk
    alert(`Delete Product ${index}`);
}

function addGalleryItem() {
    // Implementasi fungsi untuk menambah item galeri baru
    alert('Add Gallery Item');
}

function editGalleryItem(index) {
    // Implementasi fungsi untuk mengedit item galeri
    alert(`Edit Gallery Item ${index}`);
}

function deleteGalleryItem(index) {
    // Implementasi fungsi untuk menghapus item galeri
    alert(`Delete Gallery Item ${index}`);
}
