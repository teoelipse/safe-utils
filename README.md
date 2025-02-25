# Safe Multisig Transaction Hashes

This repository contains both a Bash script and a web interface for calculating Safe transaction hashes. It helps users verify transaction hashes before signing them on hardware wallets by retrieving transaction details from the Safe transaction service API and computing the domain and message hashes using the EIP-712 standard.

The project is a fork of [@pcaversaccio](https://x.com/pcaversaccio) bash script, full details of such script README can be found at [its original reository](https://github.com/pcaversaccio/safe-tx-hashes-util/blob/main/README.md).

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)

## Run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/openzeppelin/safe-utils.git
   cd safe-tx-hashes-util
   ```

2. Set up the `safe_hashes.sh` script:
   - Ensure the `safe_hashes.sh` script is located in the parent directory of the app.
   - Make the script executable:
     ```bash
     chmod +x ../safe_hashes.sh
     ```

3. Install dependencies:
   ```bash
   cd app/
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

For quick and easy access, you can use the hosted version of Safe Hash Preview at [https://www.safeutils.openzeppelin.com/](https://www.safeutils.openzeppelin.com/). This version is ready to use without any setup required.


How to use the application:
  - Select a network from the dropdown menu.
  - Enter the Safe address.
  - Enter the nonce.
  - Click "Calculate Hashes" to view the results.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Documentation](https://reactjs.org/) - learn about React.
- [Tailwind CSS](https://tailwindcss.com/) - learn about the utility-first CSS framework used in this project.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.