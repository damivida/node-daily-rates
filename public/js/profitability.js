

const profForm = document.querySelector('form');
const profApiMessage1 = document.querySelector('#profApiMessage1');
const getCoin = document.querySelector('#coin');
const getMethod = document.querySelector('#method');

profForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const coin = getCoin.value;
    const method = getMethod.value;


    fetch(`/miningPools/${coin}/${method}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(error);
            }else {
                console.log(data);
            }
        })
    })

    
})