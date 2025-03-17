use warp::Filter;
use ethers::prelude::*;
use tokio;
use std::sync::Arc;
use serde::{Deserialize, Serialize};
use std::env;
use dotenv::dotenv;
use reqwest;

#[derive(Debug, Deserialize)]
struct SendTxRequest {
    to: String,
    amount: String,
}

#[derive(Debug, Serialize)]
struct BalanceResponse {
    balance: String,
}

#[derive(Debug, Serialize)]
struct Transaction {
    hash: String,
    from: String,
    to: String,
    value: String,
    timestamp: String,
}

#[derive(Debug, Serialize)]
struct HistoryResponse {
    transactions: Vec<Transaction>,
}

#[derive(Debug, Serialize, Deserialize)]
struct WalletConnectRequest {
    dapp_url: String,
    method: String,
    params: serde_json::Value,
}


#[tokio::main]
async fn main() {
    dotenv().ok();
    let infura_api_key = env::var("INFURA_API_KEY").expect("INFURA_API_KEY not set");
    let private_key = env::var("PRIVATE_KEY").expect("PRIVATE_KEY not set");

    let provider = Provider::<Http>::try_from(format!("https://sepolia.infura.io/v3/{}", infura_api_key)).expect("Could not connect to provider");
    let wallet = private_key.parse::<LocalWallet>().unwrap().with_chain_id(1u64);

    let client = SignerMiddleware::new(provider.clone(), wallet);
    let client = Arc::new(client);

    // Enable CORS
    let cors = warp::cors().allow_any_origin().allow_methods(vec!["GET", "POST"]).allow_headers(vec!["Content-Type"]);

    // API Routes
    let balance_route = warp::path!("balance" / String)
        .and(with_client(client.clone()))
        .and_then(get_balance);

    let send_tx_route = warp::path!("send")
        .and(warp::post())
        .and(warp::body::json())
        .and(with_client(client.clone()))
        .and_then(send_transaction);

    let history_tx_routes = warp::path!("history" / String)
    .and_then(get_transaction_history)
    .with(warp::cors().allow_any_origin());

    let routes = balance_route
    .or(send_tx_route)
    .or(history_tx_routes)
    .with(cors);

    println!("Server running on http://localhost:3030");
    warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;

}

fn with_client(client: Arc<SignerMiddleware<Provider<Http>, Wallet<k256::ecdsa::SigningKey>>>) -> impl Filter<Extract = (Arc<SignerMiddleware<Provider<Http>, Wallet<k256::ecdsa::SigningKey>>>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || client.clone())
}

async fn get_balance(address: String, client: Arc<SignerMiddleware<Provider<Http>, Wallet<k256::ecdsa::SigningKey>>>) -> Result<impl warp::Reply, warp::Rejection> {
    let address: Address = address.parse().expect("Invalid address");
    let balance = client.get_balance(address, None).await.expect("Failed to fetch balance");
    Ok(warp::reply::json(&BalanceResponse {
        balance: format!("{}", ethers::utils::format_ether(balance)),
    }))
}


async fn send_transaction(body: SendTxRequest, client: Arc<SignerMiddleware<Provider<Http>, Wallet<k256::ecdsa::SigningKey>>>) -> Result<impl warp::Reply, warp::Rejection> {
    let to: Address = body.to.parse().expect("Invalid address");
    let amount = ethers::utils::parse_ether(body.amount).expect("Invalid amount");

    let tx = TransactionRequest::new()
        .to(to)
        .value(amount);

    match client.send_transaction(tx, None).await {
        Ok(pending_tx) => {
            let tx_hash = pending_tx.tx_hash();
            Ok(warp::reply::json(&serde_json::json!({ "tx_hash": format!("{:?}", tx_hash) })))
        },
        Err(e) => Ok(warp::reply::json(&serde_json::json!({ "error": format!("{}", e) }))),
    }
}

async fn get_transaction_history(address: String) -> Result<impl warp::Reply, warp::Rejection> {
    let etherscan_api_key = env::var("ETHERSCAN_API_KEY").expect("ETHERSCAN_API_KEY not set");

    let url = format!(
        "https://api-sepolia.etherscan.io/api?module=account&action=txlist&address={}&startblock=0&endblock=99999999&sort=desc&apikey={}",
        address, etherscan_api_key
    );

    let response = reqwest::get(&url).await.expect("Failed to fetch data");
    let data: serde_json::Value = response.json().await.expect("Failed to parse JSON");

    if let Some(txs) = data["result"].as_array() {
        let transactions: Vec<Transaction> = txs.iter().map(|tx| Transaction {
            hash: tx["hash"].as_str().unwrap_or("").to_string(),
            from: tx["from"].as_str().unwrap_or("").to_string(),
            to: tx["to"].as_str().unwrap_or("").to_string(),
            value: format!("{}", ethers::utils::format_ether(tx["value"].as_str().unwrap_or("0").parse::<U256>().unwrap_or(U256::zero()))),
            timestamp: tx["timeStamp"].as_str().unwrap_or("").to_string(),
        }).collect();

        Ok(warp::reply::json(&HistoryResponse { transactions }))
    } else {
        Ok(warp::reply::json(&serde_json::json!({ "error": "No transactions found" })))
    }
}







