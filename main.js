//our api url 
const APIURL = 'https://fsa-puppy-bowl.herokuapp.com/api/2308-acc-et-WEB-PT/players';

const mainEl = document.querySelector('main');
//make a reference to the form to use for our eventListener
const formEl = document.querySelector('form');
const playerName = document.querySelector('#playerName');
const playerImageUrl = document.querySelector('#playerimageURL');
const playerStatus = document.querySelector('#playerStatus');
const playerBreed = document.querySelector('#playerBreed');


//get all puppy function
async function getPuppies() {
    try {
    const response = await fetch(APIURL);
    const data = await response.json();
    console.log(data.data);
    return data.data.players
    } catch(err) {
        console.log(err);
    }
};

getPuppies();

//get single puppy
async function getSinglePlayer(name) {
    try {
        const response = await fetch(`${APIURL}/${name}`);
        const data = await response.json();
    // for testing to see if working
    //    console.log(data);
        return data;
    }  catch(err) {
        console.log(err);
    }
}

//render function
function render(players) {
    const template = players.map(player => {
        return (
        `<section>
        <h2>Player - ${player.name}</h2>
        <img src="${player.imageUrl}">
        <p>Status: ${player.status}</p>
        <p>Breed: ${player.breed}</p>
        <button data-id="${player.id}">Delete player</button>
        </section>`
        )
    }).join('');
    mainEl.innerHTML = template;
}

//delete puppy
mainEl.addEventListener('click', async (e) => {
    console.log("whole main tag");
    if(e.target.matches('button')) {
        const id = e.target.dataset.id;
        //to make sure its working when click should give id number
        //console.log(id);
        // were going to write an await fetch that will have the id
        await fetch(`${APIURL}/${id}`, {
            method: 'DELETE',
        });
        puppyBowlApp();
    }
});

//create puppy
formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        await fetch(APIURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                name: playerName.value,
                imageUrl: playerImageUrl.value,
                status: playerStatus.value,
                breed: playerBreed.value
            })
        });

        playerName.value = '';
        playerImageUrl.value = '';
        playerStatus.value = '';
        playerBreed.value = '';
        puppyBowlApp();
    } catch(err) {
        console.log(err);
    }
});

//puppy bowl app

async function puppyBowlApp() {
    const puppies = await getPuppies();
    render(puppies);
}

puppyBowlApp();