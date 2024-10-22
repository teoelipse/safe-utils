# Safe Hash Preview

This is a Next.js project that allows users to preview Safe transaction hashes.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/josepchetrit12/safe-tx-hashes-util.git
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

1. Select a network from the dropdown menu.
2. Enter the Safe address.
3. Enter the nonce.
4. Click "Calculate Hashes" to view the results.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Documentation](https://reactjs.org/) - learn about React.
- [Tailwind CSS](https://tailwindcss.com/) - learn about the utility-first CSS framework used in this project.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).