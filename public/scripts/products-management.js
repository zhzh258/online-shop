const delete_btn_eles = document.querySelectorAll(".products-item-delete-btn");

async function deleteProduct(event){
    const btn = event.target;
    // console.log("btn", btn)
    // console.log("dataset", btn.dataset)
    const id = btn.dataset.id;
    const csrfToken = btn.dataset.csrf;
    // console.log("id ", id)
    // console.log("csrftoken ", csrfToken)

    const details_item_ele = document.querySelector(`#item-${id}`)
    // 127.0.0.1
    const url = `//localhost:8080/admin/products/${id}` + `?_csrf=${csrfToken}`
    // console.log("url", url);
    const response = await fetch(url, {
        method: "DELETE",
    })
    if(!response.ok){
        alert("error!")
        throw(error);
    }

    details_item_ele.remove();
}

for(const delete_btn_ele of delete_btn_eles){
    delete_btn_ele.addEventListener("click", deleteProduct);
}