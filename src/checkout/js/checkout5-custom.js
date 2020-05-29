window.onhashchange = getCheckoutStep;
getCheckoutStep();

function getCheckoutStep() {
    var url = window.location.href;
    var urlSplit = url.split('/');
    var step = urlSplit[urlSplit.length-1].split('?')[0] || 'cart';
    var htmlCLassList = document.getElementsByTagName('html')[0].classList;
    var qtdClasses = htmlCLassList.length;

    for(var item = qtdClasses-1; item >= 0; item--) {
        if(htmlCLassList[item].indexOf('step-') > -1) {
            htmlCLassList.remove(htmlCLassList[item]);
        }
    }
    document.getElementsByTagName('html')[0].classList.add('step-'+step);
}