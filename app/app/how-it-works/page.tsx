import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HowItWorks() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">How It Works</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Purpose and Origin</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Safe Hash Preview was created as a quick response to the{" "}
            <a
              href="https://medium.com/@RadiantCapital/radiant-post-mortem-fecd6cd38081"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
            >
              Radiant exploit
            </a>
            . The core{" "}
            <a
              href="https://github.com/pcaversaccio/safe-tx-hashes-util"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
            >
              script
            </a>{" "}
            was developed by pcaversaccio, and we added a user-friendly
            interface to make it more accessible.
          </p>
          <p className="mt-4">
            This tool helps users verify Safe transaction hashes before signing
            them on hardware wallets. It calculates the domain, message, and
            Safe transaction hashes by retrieving transaction details from the
            Safe transaction service API and computing the hashes using the
            EIP-712 standard.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Select a network from the dropdown menu.</li>
            <li>Enter the Safe address.</li>
            <li>Enter the transaction nonce.</li>
            <li>Click &quot;Calculate Hashes&quot; to view the results.</li>
            <li>
              Compare the displayed hashes with those shown on your hardware
              wallet screen.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How Hashes are Calculated</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The hashes are calculated using a Bash script created by
            pcaversaccio that follows these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>
              Retrieve transaction details from the Safe transaction service
              API.
            </li>
            <li>
              Calculate the domain hash using the chain ID and Safe address.
            </li>
            <li>Calculate the message hash using the transaction details.</li>
            <li>
              Compute the Safe transaction hash using the domain and message
              hashes.
            </li>
          </ol>
          <p className="mt-4">
            The script uses the EIP-712 standard and the same type hashes as the
            Safe contracts to ensure accuracy.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supported Networks</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The app supports multiple networks, including Ethereum, Polygon,
            Arbitrum, and more. For a full list of supported networks, please
            refer to the network selection dropdown on the main page.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
