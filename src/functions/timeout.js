
const timeout = () => {

    const doPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve({
            error: 'Call to long, please repeate the process' 
          });
          //reject('This is a promise reject after 3 sec...')
        }, 3000);
    });
    
    
    doPromise.then((result) => {
        res.send(result);
    }).catch((error) => {
      res.send(error);
    })
};

module.exports = timeout;