'use strict';
// 1. Create Table
const table = document.createElement('table');
const div = document.createElement('div');

// 2. Make AJAX request
const request = new XMLHttpRequest();
request.open('GET', 'https://jsonplaceholder.typicode.com/users');
request.send();

request.addEventListener('load', function() {   
    const data = JSON.parse(this.responseText);
// 3. Dynamically create table elements
    for(const [key, value] of Object.entries(data)) {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const btn = document.createElement('button');
        th.innerText = value.name;
        btn.innerText = 'View Posts';
        btn.setAttribute('id', value.id);
        btn.setAttribute('class', 'modal, openModal');
        tr.appendChild(th);
        tr.appendChild(btn);
        table.appendChild(tr);
//4. Get Name Title, and Posts
        const getPosts = function() {
            div.innerHTML = '';
            
            const secondRequest = new XMLHttpRequest();
            secondRequest.open('GET', 'https://jsonplaceholder.typicode.com/posts');
            secondRequest.send();

            const header = document.createElement('h1');
            header.innerText = value.name;
            div.appendChild(header);

            const title = document.createElement('h3');
            
            div.appendChild(title);

        secondRequest.addEventListener('load', function() {
            const data = JSON.parse(this.responseText);
            for(const [i, el] of Object.entries(data)) {
                if(el.userId === value.id) {
                    console.log(el.id);
                    title.innerText = el.title;
                    const p = document.createElement('p');
                    p.innerText = el.body;
                    div.appendChild(p);
                }
            } 
        });
    }  
    btn.onclick = getPosts;      
} 

});
// 5. Add Table with data to page & Post response
document.body.appendChild(table);
document.body.appendChild(div);




