var slideIndex = 1;
var cartData = {"total":0,"rows":[]};
var totalCost = 0;
var items = 0;

window.onload = function() {
	console.log('loaded');
	changeimage()
	
	showSlides(slideIndex);
	
}

function Drop(){
	document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event){
	if(!event.target.matches('.dropbtn')){
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for(i=0;i<dropdowns.length;i++){
			var openDropdown = dropdowns[i];
			if(openDropdown.classList.contains('show')){
				openDropdown.classlist.remove('show');
			}
		}
	}
}

function ScrollWin(){
	console.log('Scroll loaded');
	window.scrollTo(0,1000);
}

function changeimage(){
}

function plusSlides(n){
	showSlides(slideIndex += n);
}

function showSlides(n){
	var i;
	var slides = document.getElementsByClassName("AlbumPhotos");
	if(n > slides.length)
	{
		slideIndex = 1
	}
	if(n < 1) 
	{
		slideIndex = slides.length
	}
	for (i=0; i < slides.length; i++)
	{
		slides[i].style.display = "none";
	}
	slides[slideIndex-1].style.display = "block";
}

$(function(){
	cartArray = new Array();
	$('#Content').datagrid({
		singleSelect:true
	});
	
	if(localStorage && localStorage.getItem('Cart')){
		console.log(localStorage.getItem('Cart'));
		cartArray = JSON.parse(localStorage.getItem('Cart'));
		console.log(cartArray);
		console.log(cartArray.length);
		for (i = 0; i < cartArray.length; i++){
			console.log('i = ' + i);
			var addLocalStorageItems = cartArray[i];
			console.log(addLocalStorageItems);
			var name = addLocalStorageItems['Name'];
			var price = addLocalStorageItems['Price'];
			console.log(name);
			console.log(price);
			addProduct(name, parseFloat(price));
		}
	}	

});


function AddtoCart(name,price){
	function add(){
		for(var i=0; i<cartData.total; i++){
			var row = cartData.rows[i];
			if (row.Name == name){
				row.Quantity += 1;
				return;
			}
		}
		cartData.total += 1;
		cartData.rows.push({
			Name:name,
			Quantity:1,
			Price:price
		});
	}
	add();
	totalCost += price;
	items+=1;
	$('#Content').datagrid('loadData', cartData);
	$('div.cart .cartCount').html('Items: '+items);
	$('div.cart .total').html('Total: £'+totalCost);
	
	console.log(cartData);
	var cartArrayStringify = JSON.stringify(cartArray);
	console.log(cartArrayStringify);
	localStorage.setItem("Cart",cartArrayStringify);
}
function emptyCart(){
	console.log('empty cart');
	localStorage.removeItem('Cart');
	/*for (var i = 0; i<cartData.total; i++){
		$('#cartContent').datagrid('removeRow[Array(i)]');
	}*/
	window.location.reload();
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(tourMap);
    } else {
        $('#googleMap').innerHTML = "Geolocation is not supported by this browser.";
    }
}

function MapLocation(position, x){
	var mapProp;
	if (x == 1) {
		mapProp= {
		center:new google.maps.LatLng(position),
		zoom: 8,
		}
	}
	if (x != 1) {
		var mapLat = position.coords.latitude;
		console.log(mapLat);
		var mapLng = position.coords.latitude;
		console.log(mapLng);
		
		mapProp= {
			center:new google.maps.LatLng(mapLat, mapLng),
			zoom:8,
		};
	}

	var map=new google.maps.Map(document.getElementById("gMaps"),mapProp);
	
	venueMarker({lat:52.438223,lng:0.675659}, 'A', map);
	venueMarker({lat:54.601541,lng:-5.923668}, 'B', map);
	venueMarker({lat:40.477788,lng:-3.622116}, 'C', map)
}	

function venueMarker(venueLoc, label, map){
	var marker = new google.maps.Marker({
		position: venueLoc,
		label: label,
		map: map
		});
}