

const profForm = document.querySelector('form');
const profApiMessage1 = document.querySelector('#profApiMessage1');
const getCoin = document.querySelector('#coin');
const getMethod = document.querySelector('#method');
const profMessage1 = document.querySelector('#profMessage1');
const profMessage2 = document.querySelector('#profMessage2')

profForm.addEventListener('submit', (e) => {
    e.preventDefault();

    profMessage1.textContent = "Getting data...";

    const coin = getCoin.value;
    const method = getMethod.value;

    let html = '';
    fetch(`/miningPools/${coin}/${method}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(error);
            }else if (method == 'API') {

               let pools = '';
               let res = '';
               let prop = '';

               let html = '';

 /*               for (keys in data) {
                 pools = data[keys];

                 for (keys in pools) {
                    res = pools[keys];
                    
                    for (keys in res) {
                        prop = res[keys];


                        profMessage1.textContent = keys;
                        profMessage2.textContent = prop;
                        console.log(keys)
                        console.log(prop)
                    }
                 }
                 
               } */

           // profMessage1.textContent = data;
             

            }

            console.log(data)
            profMessage1.textContent = 'App is under construction, data is visible in console.';

        })
    })
    
})