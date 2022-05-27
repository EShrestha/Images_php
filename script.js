const server = 'http://PI-BOrtiz';

const container = document.getElementById('container');

function renderImageBox(data){
    console.log(data);

    const imageBox = document.createElement('div');
    const imageIcon = document.createElement('img');
    const imageTitle = document.createElement('h2');

    imageBox.className = 'image_box';
    imageIcon.className = 'image_icon';
    imageTitle.className = 'image_title';

    imageBox.onclick = () => {location.href=`image.html?id=${data.ID}`};
    imageIcon.src = `${server}/GetImage.php?file=${data.ID}`;
    imageTitle.innerText = data.title;

    imageBox.appendChild(imageIcon);
    imageBox.appendChild(imageTitle);
    container.appendChild(imageBox);
}

async function loadImages(url){
    container.innerHTML = '';

    const response = await fetch(url);
    const json = await response.json();

    console.log(json);
    for(let i = 0; i < json.result.length; i++){
        renderImageBox(json.result[i]);
    }
}

loadImages(`${server}/GetImagesData.php`);




const searchbar = document.getElementById('searchbar');
searchbar.addEventListener('keyup', async () => {
    loadImages(`${server}/GetImagesDataByRelevance.php?keyword=${searchbar.value}`);
});

const asc_button = document.getElementById('asc_button');
const desc_button = document.getElementById('desc_button');
asc_button.addEventListener('click', async () => {
    searchbar.value = '';
    loadImages(`${server}/GetImagesDataByViewCountASC.php`);
});
desc_button.addEventListener('click', async () => {
    searchbar.value = '';
    loadImages(`${server}/GetImagesDataByViewCountDESC.php`);
});