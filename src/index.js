import React, {Component} from 'react'
import { render } from 'react-dom'
import style from './index.scss';
import ApolloClient from 'apollo-boost'
import { gql } from "apollo-boost"
import { ApolloProvider, useQuery } from '@apollo/react-hooks'

// Tutorial      -  https://www.apollographql.com/docs/react/get-started/
// Remote Server -  https://codesandbox.io/s/48p1r2roz4
// API           -  https://developers.coinbase.com/api/v2?javascript#exchange-rates
// End point     -  https://api.coinbase.com/v2/currencies
const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io'
})

const EXCHANGE_RATES = gql`
  {
    rates(currency: "USD") {
      currency
      rate
      name
    }
  }
`
function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <tr><td>Loading...</td><td>Loading...</td><td>Loading...</td></tr>
  if (error) return <td>Error :(</td>

  return data.rates.map(({ currency, rate, name }) => (
    <tr key={currency}>
      <td>{name}</td>
      <td>{currency}</td>
      <td>{rate}</td>
    </tr>
  ))
}

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h1>Fetch Exchange Rates🚀</h1>
      <table>
        <tbody>
          <tr style={{backgroundColor: '#EFE7BC', marginBottom: '2px'}}>
            <th>COUNTRY & MONEY</th>
            <th>CURRENCY</th>
            <th>RATES IN USD</th>
          </tr>
          <ExchangeRates />
        </tbody>
      </table>
    </div>
  </ApolloProvider>
)

render(<App />, document.getElementById('root'))
