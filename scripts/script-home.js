import {imgLoadError} from '/scripts/general.js';
const data = await fetch('/data.json')
    .then(response => response.json())
    .then((a) => {
        a.sort((a,b)=>Math.random() - 0.5);
        galleryImg.src = '/images-blur/'+a[photoIndex][0]+'-blur.JPG';
        galleryImg.classList.add('blurry');

        return a;
    })

console.log(data)

let photoIndex = 0;


let galleryImg = document.getElementById('galleryImg');
let nextImageLoader = document.createElement('img');
galleryImg.onload = function(){
    this.setNewImgOnLoad('/images/'+data[photoIndex][0]+'.JPG');
    let elementToChange = this.parentElement.parentElement
    elementToChange.classList.remove('v');
    elementToChange.classList.remove('h');
    elementToChange.classList.add(this.naturalHeight > this.naturalWidth ? 'v' : 'h');
    if(data[photoIndex][3]) elementToChange.classList.add('special');
    else elementToChange.classList.remove('special');

    this.onload = function() {
        console.log('gallery image has been loaded')
        let elementToChange = this.parentElement.parentElement;
        elementToChange.classList.remove('v');
        elementToChange.classList.remove('h');
        elementToChange.classList.add(this.naturalHeight > this.naturalWidth ? 'v' : 'h');
        if(data[photoIndex][3]) elementToChange.classList.add('special');
        else elementToChange.classList.remove('special');
        console.log('timeout :'+setTimeout(function(){
            nextImageLoader.setNewImgOnLoad('/images/'+data[++photoIndex][0]+'.JPG');
    },2000))}
}

nextImageLoader.onload = function(){
    galleryImg.parentElement.parentElement.classList.add('changingImage');
    console.log(galleryImg.parentElement.parentElement);
    galleryImg.parentElement.parentElement.ontransitionend = function(){
        galleryImg.src = nextImageLoader.src;
        this.classList.remove('changingImage');
        this.ontransitionend = null;
    }
}
galleryImg.onerror = imgLoadError;




