let addProductButton = document.querySelector('#add-product-btn');
let priceList = document.querySelector('#priceList');

function saveData(event) {
	event.preventDefault();
	let name = event.target.productName.value;
	let price = event.target.price.value;
	let productStore = {
		name,
		price
	}

	axios.post('https://crudcrud.com/api/876653609bdd4e2fa08971f32d2cd24b/listProduct', productStore)
		.then((res) => displayOnScreen(res.data))
		.catch((err) => console.log(err));
}

function displayOnScreen(productStore) {
	if (productStore.name === '' || productStore.price === '') {
		alert('Empty fields are not allowed');
	} else {
		//  Getting the products list element
		let productList = document.querySelector('#product-list');

		//  creating li element for storing data
		let li = document.createElement('li');
		li.textContent = productStore.name + "  -- " + productStore.price;

		let deleteButton = document.createElement('input');
		deleteButton.type = 'button';
		deleteButton.value = 'Delete';


		let id = productStore._id;
		deleteButton.onclick = () => {
			axios.delete('https://crudcrud.com/api/876653609bdd4e2fa08971f32d2cd24b/listProduct/' + id)
				.then(() => {
					console.log(res);
				})
				.catch((error) => console.log(error));
				productList.removeChild(li);
		};
		li.appendChild(deleteButton);
		productList.appendChild(li);
	}

}
// ------------------------>>>>>>>>
window.addEventListener('DOMContentLoaded', () => {
	axios.get('https://crudcrud.com/api/876653609bdd4e2fa08971f32d2cd24b/listProduct')
		.then((res) => {
			for (var i = 0; i < res.data.length; i++) {
				displayOnScreen(res.data[i]);
			}
		})
		.catch((err) => console.log(err));
})