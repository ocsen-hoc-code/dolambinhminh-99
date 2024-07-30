import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './FancyForm.css';
import getCoins from '../../api/Coins';

const CustomOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
        <div ref={innerRef} {...innerProps} className="custom-option">
            <img src={`/tokens/${data.value.toUpperCase()}.SVG`} alt={data.label} className="option-image icon-small" />
            {data.label}
        </div>
    );
};

const CustomSingleValue = (props) => {
    const { data } = props;
    return (
        <div className="custom-single-value">
            <img src={`/tokens/${data.value.toUpperCase()}.SVG`} alt={data.label} className="single-value-image icon-small" />
            {data.label}
        </div>
    );
};

const FancyForm = () => {
    const [coins, setCoins] = useState([]);
    const [amountToSend, setAmountToSend] = useState('');
    const [amountToReceive, setAmountToReceive] = useState('');
    const [currencyToSend, setCurrencyToSend] = useState(null);
    const [currencyToReceive, setCurrencyToReceive] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        getCoins().then(setCoins);
    }, []);

    useEffect(() => {
        if (!currencyToSend || !currencyToReceive) {
            setAmountToReceive('');
        }
    }, [currencyToSend, currencyToReceive]);

    const handleAmountChange = (e) => {
        const newAmountToSend = e.target.value;
        if (newAmountToSend === '' || /^[0-9]*[.,]?[0-9]*$/.test(newAmountToSend)) {
            setAmountToSend(newAmountToSend);
            setError('');
        } else {
            setError('Please enter a valid number.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currencyToSend || !currencyToReceive || currencyToSend === currencyToReceive) {
            alert('Please select different currencies for send and receive.');
            return;
        }
        if (error) {
            alert(error);
            return;
        }
        updateAmountToReceive(amountToSend);
    };

    const updateAmountToReceive = (amount) => {
        if (currencyToSend && currencyToReceive && amount && !isNaN(amount) && Number(amount) >= 0) {
            const sendCoin = coins.find(coin => coin.currency === currencyToSend.value);
            const receiveCoin = coins.find(coin => coin.currency === currencyToReceive.value);

            if (sendCoin && receiveCoin) {
                const calculatedAmount = (amount * sendCoin.price) / receiveCoin.price;
                setAmountToReceive(calculatedAmount.toFixed(10));
            } else {
                setAmountToReceive('');
            }
        } else {
            setAmountToReceive('');
        }
    };

    const formattedCoins = coins.map(coin => ({
        value: coin.currency,
        label: coin.currency,
    }));

    const filteredCoinsForSend = formattedCoins.filter(coin => coin.value !== currencyToReceive?.value);
    const filteredCoinsForReceive = formattedCoins.filter(coin => coin.value !== currencyToSend?.value);

    const isButtonEnabled = amountToSend.trim() !== '' && currencyToSend && currencyToReceive && !error;

    return (
        <form onSubmit={handleSubmit}>
            <h3>Swap</h3>

            <label className='bot-label' htmlFor="currencyToSend">Currency to send</label>
            <Select
                id="currencyToSend"
                value={currencyToSend}
                onChange={(selected) => {
                    setCurrencyToSend(selected);
                    if (!selected) {
                        setAmountToReceive('');
                    }
                }}
                options={filteredCoinsForSend}
                placeholder="Select currency"
                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                isClearable
            />

            <label htmlFor="amountToSend">Amount to send</label>
            <input
                id="amountToSend"
                value={amountToSend}
                onChange={handleAmountChange}
                type="text"
                pattern="[0-9]*[.,]?[0-9]*"
                title="Please enter a valid number."
            />
            {error && <p className="error">{error}</p>}

            <label className='bot-label' htmlFor="currencyToReceive">Currency to receive</label>
            <Select
                id="currencyToReceive"
                value={currencyToReceive}
                onChange={(selected) => {
                    setCurrencyToReceive(selected);
                    if (!selected) {
                        setAmountToReceive('');
                    }
                }}
                options={filteredCoinsForReceive}
                placeholder="Select currency"
                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                isClearable
            />

            <label htmlFor="amountToReceive">Amount to receive</label>
            <input
                id="amountToReceive"
                value={amountToReceive}
                readOnly
            />

            <button type="submit" disabled={!isButtonEnabled}>CONFIRM SWAP</button>
        </form>
    );
};

export default FancyForm;
