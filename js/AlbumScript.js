var slideIndex = 1;
window.onload = function () {
	changeimage()
	
	showSlides(slideIndex);
	
	
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
