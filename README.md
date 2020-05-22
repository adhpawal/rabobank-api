# rabobank-api
Rabo Bank Node Application

## Installation Instruction
npm install

npm start

## API Access


### Request
GET http://localhost:3000/transactions?access_token=AAIkODBhNzcyOTgtMTkzYi00YzAzLWI0NTMtMjllOWVhZDVjZTZjmEBIiirTfVEIyWO3FxR1x21CiFZOec1DhyoY3A5HjBGow6CkURs3_yTONFhsK0rc5QRgjK5GLne9yjd7DKv4_X-snn2w1N_3H1y9WYjAKeO7HMOwMnxehpLnFSYRvEexuESyPQxKfB3v6XseyjToFWmHFbOt6_Uw5vz-czqOYY1_7OIIQ3Y7lGwIvjxmX7aN19YYqhzrtLnH_KsdYeOpwA&client_id=80a77298-193b-4c03-b453-29e9ead5ce6c

### Response

```json
{
    "accounts": [
        {
            "resourceId": "TkwzOVJBQk8wMzIwMTMwODc4OkVVUg",
            "iban": "NL39RABO0320130878",
            "currency": "EUR",
            "status": "enabled",
            "name": "Rabobank Nederland B.V.",
            "_links": {
                "balances": "/v3/accounts/TkwzOVJBQk8wMzIwMTMwODc4OkVVUg/balances",
                "transactions": "/v3/accounts/TkwzOVJBQk8wMzIwMTMwODc4OkVVUg/transactions"
            }
        },
        {
            "resourceId": "TkwxNFJBQk8wMzIwMTMwODQzOkVVUg",
            "iban": "NL14RABO0320130843",
            "currency": "EUR",
            "status": "enabled",
            "name": "Rabobank Nederland B.V.",
            "_links": {
                "balances": "/v3/accounts/TkwxNFJBQk8wMzIwMTMwODQzOkVVUg/balances",
                "transactions": "/v3/accounts/TkwxNFJBQk8wMzIwMTMwODQzOkVVUg/transactions"
            }
        },
        {
            "resourceId": "Tkw4OVJBQk8wMzIwMTMwODUxOkVVUg",
            "iban": "NL89RABO0320130851",
            "currency": "EUR",
            "status": "enabled",
            "name": "Rabobank Nederland B.V.",
            "_links": {
                "balances": "/v3/accounts/Tkw4OVJBQk8wMzIwMTMwODUxOkVVUg/balances",
                "transactions": "/v3/accounts/Tkw4OVJBQk8wMzIwMTMwODUxOkVVUg/transactions"
            }
        },
        {
            "resourceId": "TkwxN1JBQk8wMzIwMTMwODg2OkVVUg",
            "iban": "NL17RABO0320130886",
            "currency": "EUR",
            "status": "enabled",
            "name": "Rabobank Nederland B.V.",
            "_links": {
                "balances": "/v3/accounts/TkwxN1JBQk8wMzIwMTMwODg2OkVVUg/balances",
                "transactions": "/v3/accounts/TkwxN1JBQk8wMzIwMTMwODg2OkVVUg/transactions"
            }
        }
    ]
}
```

