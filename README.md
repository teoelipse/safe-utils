# Safe Multisig Transaction Hashes

This repository contains both a Bash script and a web interface for calculating Safe transaction hashes. It helps users verify transaction hashes before signing them on hardware wallets by retrieving transaction details from the Safe transaction service API and computing the domain and message hashes using the EIP-712 standard.

## Web Interface

A user-friendly web interface is available at [safehashpreview.com](https://www.safehashpreview.com) that makes it easy to:
- Select from supported networks via dropdown
- Enter Safe address and nonce
- View calculated hashes and transaction details
- Copy values with one click
- Compare hashes with hardware wallet screen

### Local Development

To run the web interface locally:

1. Clone the repository:
```bash
git clone git@github.com:josepchetrit12/safe-preview-app.git
cd safe-preview-app
```

2. Install dependencies:
```bash
cd app/
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Command Line Script

The original Bash script is still available for command-line usage. See below for supported networks and usage instructions.

### Supported Networks

- Arbitrum (identifier: `arbitrum`, chain ID: `42161`)
- Aurora (identifier: `aurora`, chain ID: `1313161554`)
- Avalanche (identifier: `avalanche`, chain ID: `43114`)
- Base (identifier: `base`, chain ID: `8453`)
- Base Sepolia (identifier: `base-sepolia`, chain ID: `84532`)
- Blast (identifier: `blast`, chain ID: `81457`)
- BSC (Binance Smart Chain) (identifier: `bsc`, chain ID: `56`)
- Celo (identifier: `celo`, chain ID: `42220`)
- Ethereum (identifier: `ethereum`, chain ID: `1`)
- Gnosis (identifier: `gnosis`, chain ID: `100`)
- Gnosis Chiado (identifier: `gnosis-chiado`, chain ID: `10200`)
- Linea (identifier: `linea`, chain ID: `59144`)
- Mantle (identifier: `mantle`, chain ID: `5000`)
- Optimism (identifier: `optimism`, chain ID: `10`)
- Polygon (identifier: `polygon`, chain ID: `137`)
- Polygon zkEVM (identifier: `polygon-zkevm`, chain ID: `1101`)
- Scroll (identifier: `scroll`, chain ID: `534352`)
- Sepolia (identifier: `sepolia`, chain ID: `11155111`)
- World Chain (identifier: `worldchain`, chain ID: `480`)
- X Layer (identifier: `xlayer`, chain ID: `195`)
- ZKsync Era (identifier: `zksync`, chain ID: `324`)

### Script Usage

```console
./safe_hashes.sh [--help] [--list-networks] --network <network> --address <address> --nonce <nonce>
```

**Options:**
- `--help`: Display help message
- `--list-networks`: List supported networks and chain IDs
- `--network <network>`: Specify network (e.g., `ethereum`, `polygon`)
- `--address <address>`: Specify Safe multisig address
- `--nonce <nonce>`: Specify transaction nonce

Make script executable before use:
```console
chmod +x safe_hashes.sh
```

## Trust Assumptions

1. You trust the script and web interface code 😃
2. You trust Linux
3. You trust Foundry
4. You trust the Safe transaction service API
5. You trust Ledger's secure screen

## Authors

- Web Interface: [josepchetrit12](https://github.com/josepchetrit12) and [xaler5](https://github.com/xaler5) from OpenZeppelin
- Original Script: [pcaversaccio](https://github.com/pcaversaccio)

## License

AGPL-3.0 license
