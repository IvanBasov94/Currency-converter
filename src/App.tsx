import React, { useEffect, useRef, useState } from 'react';
import Block from './components/Block';
import './index.scss';

const App = () => {

   const [fromCurrency, setFromCurrence] = useState<string>('RUB');
   const [toCurrency, setToCurrence] = useState<string>('USD');
   const [fromPrice, setFromPrice] = useState<number>(0);
   const [toPrice, setToPrice] = useState<number>(1);
   const ratesRef = useRef<any>({});


   useEffect(() => {
      fetch('https://cdn.cur.su/api/latest.json')
         .then((res) => res.json())
         .then((json) => {
            ratesRef.current = json.rates;
            onChangeToPrice(1);
         })
         .catch((err) => {
            console.warn(err);
            alert('Не удалось получить информацию')
         });
   }, []);

   useEffect(() => {
      onChangeFromPrice(fromPrice);
   }, [fromCurrency]);

   useEffect(() => {
      onChangeToPrice(toPrice);
   }, [toCurrency]);

   const onChangeFromPrice = (value: number) => {
      const price = value / ratesRef.current[fromCurrency];
      const result: number = price * ratesRef.current[toCurrency];
      setToPrice(Math.trunc(result));
      setFromPrice(value);
   };

   const onChangeToPrice = (value: number) => {
      const result = (ratesRef.current[fromCurrency] /
            ratesRef.current[toCurrency]) * value;
      setFromPrice(Math.trunc(result));
      setToPrice(value);
   };

   return (
      <div className="App">
         <Block
            value={fromPrice}
            currency={fromCurrency}
            onChangeCurrency={setFromCurrence}
            onChangeValue={onChangeFromPrice}
         />
         <Block
            value={toPrice}
            currency={toCurrency}
            onChangeCurrency={setToCurrence}
            onChangeValue={onChangeToPrice}
         />
      </div>
   );
}

export default App;