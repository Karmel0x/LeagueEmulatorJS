
function init_utilities(){
    global.Utilities = {};
    global.Utilities.wait = (ms) => new Promise(resolve => setTimeout(() => resolve(null), ms));

}

module.exports = init_utilities;
