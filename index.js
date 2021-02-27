import reddit from './redditapi'

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form Event Listner
searchForm.addEventListener('submit', e => 
{
    //Get search term 
    const searchTerm = searchInput.value;
    //console.log(searchTerm);
    //Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    //console.log(sortBy);
    //Get limit 
    const searchLimit = document.getElementById('limit').value;
    //console.log(searchLimit);

    //Check input 
    if(searchTerm === '') {
        //Show message 
        showMessage('Please add a search term', 'alert-danger');
    }

    //Clear input 
    searchInput.value = '';

    //Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy).then
    (results => {
            console.log(results);
            let output = '<div class = "card-columns">';
            //Loop through posts
            results.forEach(post => {
                //Check for image 
                const image = post.preview ? post.preview.images[0].source.url : 'https://www.slashgear.com/wp-content/uploads/2019/09/reddit_logo_main.jpg';
                output += `
                <div class="card">
                    <img class="card-img-top" src="${image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${truncateText(post.selftext, 100)}</p>
                            <a href="${post.url}" target=_blank class="btn btn-primary">Can't get enough?</a>
                    </div>
                </div>
                `;
            });
            output += '</div>';
            document.getElementById('results').innerHTML = output;
        });

    e.preventDefault();
});

//Show Message

function showMessage(message, className){
    //create div 
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    //add text 
    div.appendChild(document.createTextNode(message));
    // Get parent container 
    const searchContainer = document.getElementById('search-container');
    // Get search 
    const search = document.getElementById('search');

    //Insert message 
    searchContainer.insertBefore(div, search);

    //timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Truncate Text 
function truncateText(text, limit) {
    const shortened = text.indexOf(' ', limit);
    if(shortened == -1) return text;
    return text.substring(0, shortened);
}