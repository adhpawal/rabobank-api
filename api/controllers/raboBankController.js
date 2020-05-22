const request = require('request');
const axios = require('axios');
const fs = require('fs');
const querystring = require('querystring');
const URLSafeBase64 = require('urlsafe-base64');
const https = require('https')
const path = require("path");

exports.list_all_transactions = async function (req, res) {
    let headers = {
        'accept': 'application/json',
        'authorization': 'Bearer ' + req.query.access_token,
        'date': 'Tue, 18 Sep 2018 09:51:01 GMT',
        'digest': 'sha-512=z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==',
        'psu-ip-address': '127.0.0.1',
        'signature': 'keyId="1523433508",algorithm="rsa-sha512",headers="date digest x-request-id",signature="y5o7gKxmfA6AT6IvZ5L89uWxhjcw0BPqDlfK6WX1pB5vKtOctzwustjHI6TjdgQMzQL9LAJX6izs5lVCB6Bjl/l3ntCt4rigJPzfTLbnSlxBhLcabru+KyC7pu00NasyMzl4kv/1jtxrBqzSsUvCz87IBSTLSeoPCJc4E5ME82Bdpss67RWcVe94UzLW8jsCqrncLxiMsD6d2ZQmnH/S7Gu9zk8g9eJovmLIaVLn4C5vW7khS63hSZf8qdTEDlMI/L+QgYVgZVIijKosYEnCB9tH5OYWS9cQ1g1NBrMHQASg/ZV8CxHkXizYg7gQoTGaKvSeD7QC172OqySblE1A9Q=="',
        'tpp-signature-certificate': 'MIIDkDCCAnigAwIBAgIEWs3AJDANBgkqhkiG9w0BAQsFADCBiTELMAkGA1UEBhMCTkwxEDAOBgNVBAgMB1V0cmVjaHQxEDAOBgNVBAcMB1V0cmVjaHQxETAPBgNVBAoMCFJhYm9iYW5rMRwwGgYDVQQLDBNPbmxpbmUgVHJhbnNhY3Rpb25zMSUwIwYDVQQDDBxQU0QyIEFQSSBQSSBTZXJ2aWNlcyBTYW5kYm94MB4XDTE4MDQxMTA3NTgyOFoXDTIzMDQxMTA3NTgyOFowgYkxCzAJBgNVBAYTAk5MMRAwDgYDVQQIDAdVdHJlY2h0MRAwDgYDVQQHDAdVdHJlY2h0MREwDwYDVQQKDAhSYWJvYmFuazEcMBoGA1UECwwTT25saW5lIFRyYW5zYWN0aW9uczElMCMGA1UEAwwcUFNEMiBBUEkgUEkgU2VydmljZXMgU2FuZGJveDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANoAjqGWUgCIm2F+0sBSEwLal+T3u+uldLikpxHCB8iL1GD7FrRjcA+MVsxhvHly7vRsHK+tQyMSaeK782RHpY33qxPLc8LmoQLb2EuiQxXj9POYkYBQ74qkrZnvKVlR3WoyQWeDOXnSY2wbNFfkP8ET4ElwyuIIEriwYhab0OIrnnrO8X82/SPZxHwEd3aQjQ6uhiw8paDspJbS5WjEfuwY16KVVUYlhbtAwGjvc6aK0NBm+LH9fMLpAE6gfGZNy0gzMDorVNbkQK1IoAGD8p9ZHdB0F3FwkILEjUiQW6nK+/fKDNJ0TBbpgZUpY8bR460qzxKdeZ1yPDqX2Cjh6fkCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAYL4iD6noMJAt63kDED4RB2mII/lssvHhcxuDpOm3Ims9urubFWEpvV5TgIBAxy9PBinOdjhO1kGJJnYi7F1jv1qnZwTV1JhYbvxv3+vk0jaiu7Ew7G3ASlzruXyMhN6t6jk9MpaWGl5Uw1T+gNRUcWQRR44g3ahQRIS/UHkaV+vcpOa8j186/1X0ULHfbcVQk4LMmJeXqNs8sBAUdKU/c6ssvj8jfJ4SfrurcBhY5UBTOdQOXTPY85aU3iFloerx7Oi9EHewxInOrU5XzqqTz2AQPXezexVeAQxP27lzqCmYC7CFiam6QBr06VebkmnPLfs76n8CDc1cwE6gUl0rMA==',
        'x-ibm-client-id': req.query.client_id,
        'x-request-id': '95126d8f-ae9d-4ac3-ac9e-c357dcd78811'
    };

    let options = {
        url: 'https://api-sandbox.rabobank.nl/openapi/sandbox/payments/account-information/ais/v3/accounts',
        headers: headers,
        key: fs.readFileSync(path.resolve(__dirname, "../../key.pem")),
        cert: fs.readFileSync(path.resolve(__dirname, "../../cert.pem")),
    };

    request(options, callback);

    async function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            fetchAllTransactions(JSON.parse(body)).then((results) => {
                res.json(results)
            })
        } else {
            res.json(JSON.parse(body));
        }
    }

    async function fetchAllTransactions(accountResponse) {
        let transactionResults = []
        let accountDetails = accountResponse.accounts;
        let promises = []
        for (let i = 0; i < accountDetails.length; i++) {
            let referenceId = accountDetails[i].resourceId;
            promises.push(fetchTransactionByAccountId(referenceId));
        }

        return Promise.all(promises);
    }

    async function fetchTransactionByAccountId(referenceId) {
        const parameters = {
            bookingStatus: 'booked'
        }
        const get_request_args = querystring.stringify(parameters);
        const safeEncodedString = URLSafeBase64.encode(new Buffer(get_request_args))
        let options = {
            url: 'https://api-sandbox.rabobank.nl/openapi/sandbox/payments/account-information/ais/v3/accounts/' + referenceId + '/transactions?' + get_request_args,
            method: 'get',
            headers: headers
        };

        var instance = axios.create({
            httpsAgent: new https.Agent({
                key: fs.readFileSync(path.resolve(__dirname, "../../key.pem")),
                cert: fs.readFileSync(path.resolve(__dirname, "../../cert.pem")),
                rejectUnauthorized: false
            })
        })
        return instance(options).then(function (response) {
            // handle success
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            // handle error
            console.log(error);
            return [];
        });
    }
};