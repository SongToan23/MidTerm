var food = [
    {
        id: 1,
        foodName: "Bánh Xèo",
        foodImage: "https://cdn.tgdd.vn/Files/2020/05/20/1256908/troi-mua-thu-lam-banh-xeo-kieu-mien-bac-gion-ngon-it-dau-mo-202203041327402848.jpg",
        foodPrice: "30.000",
    },
    {
        id: 2,
        foodName: "Bánh Mì",
        foodImage: "https://cdn.tuoitre.vn/2022/8/2/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369.jpg",
        foodPrice: "20.000",
    },
    {
        id: 3,
        foodName: "Mỳ Quảng",
        foodImage: "https://mia.vn/media/uploads/blog-du-lich/mi-quang-da-nang-mon-an-tru-danh-chua-thu-xem-nhu-chua-den-da-nang-03-1636965593.jpeg",
        foodPrice: "25.000",
    },
]; // Mảng lưu thông tin món ăn

function showFood() {
    var html = "";
    for (var i = 0; i < food.length; i++) {
        html += "<tr>";
        html += "<td>" + food[i].id + "</td>";
        html += "<td>" + food[i].foodName + "</td>";
        html += "<td><img src='" + food[i].foodImage + "' style='height:100px;width:100px;'></td>";
        html += "<td>" + food[i].foodPrice + "</td>";
        html += "<td>";
        html += "<button onclick='editFood(" + i + ")'>Sửa</button>";
        html += "<button onclick='deleteFood(" + food[i].id + ")'>Xoá</button>";
        html += "</td>";
        html += "</tr>";
    }
    document.getElementById("tbl").innerHTML = html;
}

function createFood() {
    var foodName = document.getElementById("foodName").value;
    var foodImage = document.getElementById("foodImage").value;
    var foodPrice = document.getElementById("foodPrice").value;

    var newFood = {
        id: food.length + 1, // Tính id cho món ăn mới
        foodName: foodName,
        foodImage: foodImage,
        foodPrice: foodPrice
    };
    food.push(newFood);
    localStorage.setItem('listFood',JSON.stringify(food));           
    showFood();
}

function deleteFood(index) {
    food.splice(index, 1); // Xoá phần tử ở chỉ số index từ mảng food
    showFood(); // Hiển thị lại danh sách món ăn sau khi xoá
}

var editIndex; // Biến lưu index của món ăn đang được chỉnh sửa

function editFood(index) {
    editIndex = index; // Lưu index của món ăn đang được chỉnh sửa
    document.getElementById("editName").value = food[index].foodName;
    document.getElementById("editImage").value = food[index].foodImage;
    document.getElementById("editPrice").value = food[index].foodPrice;
    openModal(); // Hiển thị modal chỉnh sửa
}

function openModal() {
    document.getElementById("editModal").style.display = "block";
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

function saveEdit() {
    var newName = document.getElementById("editName").value;
    var newImage = document.getElementById("editImage").value;
    var newPrice = document.getElementById("editPrice").value;

    if (newName && newImage && newPrice) {
        food[editIndex].foodName = newName;
        food[editIndex].foodImage = newImage;
        food[editIndex].foodPrice = newPrice;
        closeModal(); // Đóng modal sau khi lưu
        showFood(); // Hiển thị lại bảng sau khi sửa
    } else {
        alert("Vui lòng nhập đầy đủ thông tin!");
    }
}

function searchFood() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbl");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; // Số thứ tự cột tên món ăn trong bảng
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// Hiển thị danh sách món ăn ban đầu khi trang được tải
showFood();
