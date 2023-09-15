const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convertButton');
const resultElement = document.getElementById('result');

async function convertCurrency(){
    try{
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount)) {
            resultElement.textContent = 'Invalid Amount';
            return;
        }
        const conversionRate = await getConversionRate(fromCurrency, toCurrency);

        if (conversionRate === null) {
            resultElement.textContent = 'Cannot fetch data';
            return;
        }
        const convertedAmount = (amount*conversionRate).toFixed(2);
        resultElement.textContent = `${amount} ${fromCurrency} is approximately ${convertedAmount} ${toCurrency}`;

    } catch(error){
        console.log(error);
        resultElement.textContent = 'Error 400';
    }
}

async function getConversionRate(fromCurrency, toCurrency){
    try{
        const response = await fetch(`https://v6.exchangerate-api.com/v6/79444216c247ebe86a616917/latest/${fromCurrency}`);
        const data = await response.json();
        return data.conversion_rates[toCurrency.toUpperCase()];
    } catch(error){
        console.log(error);
        resultElement.textContent = 'Error 401';
    }
}

convertButton.addEventListener('click', convertCurrency);