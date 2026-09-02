async function loadMenu(filter){
    try{
        const response = await fetch(`http://localhost:3000/api/menus/${filter}`);
        const menuItems = await response.json();
        const container = document.getElementById("menu-container");
        container.innerHTML ="";
        menuItems.forEach(item => {
            const ItemDiv = document.createElement('div');
            ItemDiv.className="menu-item";
            ItemDiv.innerHTML = `
                <img class='menu-imagel' src="img/${item.name}.jpg">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
                <p>${item.cat}</p>
            `;
            container.appendChild(ItemDiv);
        });
   }catch(error){
        console.error("เกิดข้อผิดพลาดในการแสดงรายการสินค้า",error);
    }
}

loadMenu("all");