var request = require('request');
var fs = require('fs'); 

exports.list_all_transactions = function(req, res) {
    console.log("Pawal")
    var headers = {
        'accept': 'application/json',
        'authorization': 'Bearer ' + req.query.access_token,
        'date': 'Tue, 18 Sep 2018 09:51:01 GMT',
        'digest': 'sha-512=z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==',
        'psu-ip-address': '127.0.0.1',
        'signature': 'keyId="1523433508",algorithm="rsa-sha512",headers="date digest x-request-id",signature="y5o7gKxmfA6AT6IvZ5L89uWxhjcw0BPqDlfK6WX1pB5vKtOctzwustjHI6TjdgQMzQL9LAJX6izs5lVCB6Bjl/l3ntCt4rigJPzfTLbnSlxBhLcabru+KyC7pu00NasyMzl4kv/1jtxrBqzSsUvCz87IBSTLSeoPCJc4E5ME82Bdpss67RWcVe94UzLW8jsCqrncLxiMsD6d2ZQmnH/S7Gu9zk8g9eJovmLIaVLn4C5vW7khS63hSZf8qdTEDlMI/L+QgYVgZVIijKosYEnCB9tH5OYWS9cQ1g1NBrMHQASg/ZV8CxHkXizYg7gQoTGaKvSeD7QC172OqySblE1A9Q=="',
        'tpp-signature-certificate': 'MIIDkDCCAnigAwIBAgIEWs3AJDANBgkqhkiG9w0BAQsFADCBiTELMAkGA1UEBhMCTkwxEDAOBgNVBAgMB1V0cmVjaHQxEDAOBgNVBAcMB1V0cmVjaHQxETAPBgNVBAoMCFJhYm9iYW5rMRwwGgYDVQQLDBNPbmxpbmUgVHJhbnNhY3Rpb25zMSUwIwYDVQQDDBxQU0QyIEFQSSBQSSBTZXJ2aWNlcyBTYW5kYm94MB4XDTE4MDQxMTA3NTgyOFoXDTIzMDQxMTA3NTgyOFowgYkxCzAJBgNVBAYTAk5MMRAwDgYDVQQIDAdVdHJlY2h0MRAwDgYDVQQHDAdVdHJlY2h0MREwDwYDVQQKDAhSYWJvYmFuazEcMBoGA1UECwwTT25saW5lIFRyYW5zYWN0aW9uczElMCMGA1UEAwwcUFNEMiBBUEkgUEkgU2VydmljZXMgU2FuZGJveDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANoAjqGWUgCIm2F+0sBSEwLal+T3u+uldLikpxHCB8iL1GD7FrRjcA+MVsxhvHly7vRsHK+tQyMSaeK782RHpY33qxPLc8LmoQLb2EuiQxXj9POYkYBQ74qkrZnvKVlR3WoyQWeDOXnSY2wbNFfkP8ET4ElwyuIIEriwYhab0OIrnnrO8X82/SPZxHwEd3aQjQ6uhiw8paDspJbS5WjEfuwY16KVVUYlhbtAwGjvc6aK0NBm+LH9fMLpAE6gfGZNy0gzMDorVNbkQK1IoAGD8p9ZHdB0F3FwkILEjUiQW6nK+/fKDNJ0TBbpgZUpY8bR460qzxKdeZ1yPDqX2Cjh6fkCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAYL4iD6noMJAt63kDED4RB2mII/lssvHhcxuDpOm3Ims9urubFWEpvV5TgIBAxy9PBinOdjhO1kGJJnYi7F1jv1qnZwTV1JhYbvxv3+vk0jaiu7Ew7G3ASlzruXyMhN6t6jk9MpaWGl5Uw1T+gNRUcWQRR44g3ahQRIS/UHkaV+vcpOa8j186/1X0ULHfbcVQk4LMmJeXqNs8sBAUdKU/c6ssvj8jfJ4SfrurcBhY5UBTOdQOXTPY85aU3iFloerx7Oi9EHewxInOrU5XzqqTz2AQPXezexVeAQxP27lzqCmYC7CFiam6QBr06VebkmnPLfs76n8CDc1cwE6gUl0rMA==',
        'x-ibm-client-id': '80a77298-193b-4c03-b453-29e9ead5ce6c',
        'x-request-id': '95126d8f-ae9d-4ac3-ac9e-c357dcd78811'
    };
    
    var options = {
        url: 'https://api-sandbox.rabobank.nl/openapi/sandbox/payments/account-information/ais/v3/accounts',
        headers: headers,
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'), 
    };

    console.log("Pawal")
    request(options, callback);
    console.log("Pawal")

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
            res.json(JSON.parse(body));
        }else{
            console.log(body)
            res.json(JSON.parse(body));
        }
    }
    
};