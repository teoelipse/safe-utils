import { NextRequest, NextResponse } from 'next/server'

const API_URLS: { [key: string]: string } = {
  arbitrum: "https://safe-transaction-arbitrum.safe.global",
  aurora: "https://safe-transaction-aurora.safe.global",
  avalanche: "https://safe-transaction-avalanche.safe.global",
  base: "https://safe-transaction-base.safe.global",
  "base-sepolia": "https://safe-transaction-base-sepolia.safe.global",
  blast: "https://safe-transaction-blast.safe.global",
  bsc: "https://safe-transaction-bsc.safe.global",
  celo: "https://safe-transaction-celo.safe.global",
  ethereum: "https://safe-transaction-mainnet.safe.global",
  gnosis: "https://safe-transaction-gnosis-chain.safe.global",
  "gnosis-chiado": "https://safe-transaction-chiado.safe.global",
  linea: "https://safe-transaction-linea.safe.global",
  mantle: "https://safe-transaction-mantle.safe.global",
  optimism: "https://safe-transaction-optimism.safe.global",
  polygon: "https://safe-transaction-polygon.safe.global",
  "polygon-zkevm": "https://safe-transaction-zkevm.safe.global",
  scroll: "https://safe-transaction-scroll.safe.global",
  sepolia: "https://safe-transaction-sepolia.safe.global",
  worldchain: "https://safe-transaction-worldchain.safe.global",
  xlayer: "https://safe-transaction-xlayer.safe.global",
  zksync: "https://safe-transaction-zksync.safe.global"
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const network = searchParams.get('network')
  const address = searchParams.get('address')
  const nonce = searchParams.get('nonce')

  if (!network || !address || !nonce) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  const apiUrl = API_URLS[network]
  if (!apiUrl) {
    return NextResponse.json({ error: 'Invalid network' }, { status: 400 })
  }

  try {
    const scriptResponse = await fetch(`${request.nextUrl.origin}/api/execute-script?network=${network}&address=${address}&nonce=${nonce}`)
    
    if (!scriptResponse.ok) {
      const errorText = await scriptResponse.text()
      console.error('Script execution failed:', errorText)
      return NextResponse.json({ error: 'Script execution failed' }, { status: scriptResponse.status })
    }

    const scriptData = await scriptResponse.json()


    return NextResponse.json({ result: scriptData })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred while processing the request' }, { status: 500 })
  }
}
