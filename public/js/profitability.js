const profForm = document.querySelector('form');
const profApiMessage1 = document.querySelector('#profApiMessage1');
const getCoin = document.querySelector('#coin');
const getMethod = document.querySelector('#method');
const profMessage1 = document.querySelector('#profMessage1');
const profMessage2 = document.querySelector('#profMessage2')
const poolNameSelector = document.querySelector('#poolName');
const poolListSelector = document.querySelector('#poolList');

profForm.addEventListener('submit', (e) => {
    e.preventDefault();

    poolNameSelector.textContent = "Getting data...";
    poolListSelector.innerHTML = '';

    const coin = getCoin.value;
    const method = getMethod.value;

    let html = '';
    fetch(`/miningPools/${coin}/${method}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(error);
            }else if (method == 'api' || 'crawler') {

               let poolName = '';
               let res = '';
               let prop = '';

               let html = '';

               for (key in data) {

                 pools = data[key];
                 poolName = key + '</br>';

                 for (keys in pools) {
                    resPools = pools[keys];
                    
                    for (keys in resPools) {
                        prop = resPools[keys];

                        if (keys == 'poolName') {
                            keys = '<strong>' + keys + '</strong>';
                        }

                        if (keys == 'url') {

                           prop = '<a href="' + resPools[keys] + '" target = "_blank">mining claculator</a>';
                        }

                        html += keys + ': ';
                        html += prop;
                        html += '</br>'
                        html += '</br>'

                    }
                    
                 }
                 
               }
            
              // console.log(html)
            //document.getElementById('poolList').innerHTML = html;
            
           poolNameSelector.innerHTML = poolName;
           poolListSelector.innerHTML = html;
            
    }

            
           /*  console.log(data)
            profMessage1.textContent = 'UI is under construction, data is visible in console.';
 */
        })
    })
    
})