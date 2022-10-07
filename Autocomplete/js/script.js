const search = document.querySelector('#search');
const matchList = document.querySelector('#match-list');

// search
const searchStates = async searchText => {
    const res = await fetch('data/states.json');
    const states  = await res.json();

    let matches = states.filter(states => {
        const reges = new RegExp(`^${searchText}`, 'gi');
        return states.name.match(reges) || states.abbr.match(reges);
    });
    if(searchText.length === 0){
        matches= [];
        matchList.innerHTML = '';
    }
    outputHtml(matches);
};

const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
        <div class="card card-body mb-1">
            <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
            <small>lat: ${match.lat} / long: ${match.long}</small>
        </div>
        `).join('');
        // console.log(html)
        matchList.innerHTML = html;
    }
    // else{
    //     const html = `
    //     <div class="card card-body mb-1">
    //         <h4>No Results Found.</h4>
    //     </div>`;
    //     matchList.innerHTML = html;
    // }

}

search.addEventListener('input', () => searchStates(search.value));