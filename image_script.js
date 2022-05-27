const server = 'http://PI-BOrtiz';

const title_elements = document.getElementsByClassName('title');
const image_element = document.getElementById('image');
const comments_element = document.getElementById('comments');
const views_element = document.getElementById('views');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page_id = urlParams.get('id');

async function fetchImageData(){
    return await fetch(`${server}/GetImageData.php?id=${page_id}`);
}

async function fetchComments(){
    return await fetch(`${server}/GetComments.php?id=${page_id}`);
}

function renderComment(comment){
    console.log(comment);

    const div = document.createElement('div');
    const username = document.createElement('div');
    const comElm = document.createElement('div');
    
    username.innerText = comment.username;
    username.className = 'comment_username';
    comElm.innerText = comment.comment;
    comElm.className = 'comment_message';

    div.className = 'comment';

    div.appendChild(username);
    div.appendChild(comElm);
    comments_element.appendChild(div);
}

async function loadPage(){
    
    console.log('hello');
    let json = await (await fetchImageData()).json();
    let comments;
    try{
        comments = await (await fetchComments()).json();
    }catch(e){
        console.log(e);
    }
    

    console.log(json);
    console.log(comments);

    title_elements[0].innerText = json.result[0].title;
    title_elements[1].innerText = json.result[0].title;

    views_element.innerText = `Views: ${json.result[0].viewCount}`;

    image_element.src = `${server}/GetImage.php?file=${page_id}`;

    if(comments){
        for(let i = 0; i < comments.result.length; i++){
            renderComment(comments.result[i]);
        }
    }
    
}

loadPage();





const messageBox = document.getElementById('comment_box');
const messageButton = document.getElementById('send_button');
messageButton.addEventListener('click', async () => {

    await fetch(`${server}/CreateComment.php?id=${page_id}&comment=${messageBox.value}`).then(res => {
        location.reload();
    });
});
