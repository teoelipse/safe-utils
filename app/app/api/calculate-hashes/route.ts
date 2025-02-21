import { NextRequest, NextResponse } from 'next/server'
import { execFile } from 'child_process'
import util from 'util'
import path from 'path'
import { API_URLS, isValidEthereumAddress, isValidNetwork, isValidNonce } from '@/lib/utils'

const execFilePromise = util.promisify(execFile)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const network = searchParams.get('network')
  const address = searchParams.get('address')
  const nonce = searchParams.get('nonce')

  // Check for missing parameters
  if (!network || !address || !nonce) {
    return NextResponse.json({ 
      error: 'Missing required parameters',
      details: 'network, address, and nonce are required' 
    }, { status: 400 })
  }

  // Validate network
  if (!isValidNetwork(network)) {
    return NextResponse.json({ 
      error: 'Invalid network',
      details: `Network must be one of: ${Object.keys(API_URLS).join(', ')}` 
    }, { status: 400 })
  }

  // Validate address
  if (!isValidEthereumAddress(address)) {
    return NextResponse.json({ 
      error: 'Invalid address',
      details: 'Address must be a valid Ethereum address (0x followed by 40 hex characters)' 
    }, { status: 400 })
  }

  // Validate nonce
  if (!isValidNonce(nonce)) {
    return NextResponse.json({ 
      error: 'Invalid nonce',
      details: 'Nonce must be a positive integer between 0 and 1000000' 
    }, { status: 400 })
  }

  try {
    const scriptPath = path.resolve(process.cwd(), '..', 'safe_hashes.sh')
    
    // Validate script path
    if (!scriptPath.endsWith('safe_hashes.sh')) {
      return NextResponse.json({ 
        error: 'Invalid script configuration',
        details: 'Script path validation failed' 
      }, { status: 500 })
    }

    const { stdout, stderr } = await execFilePromise(
      scriptPath,
      ['--network', network, '--address', address, '--nonce', nonce, '--json']
    )

    if (stderr) {
      console.error('Script error:', stderr)
      return NextResponse.json({ error: 'Error executing script' }, { status: 500 })
    }

    try {
      const result = JSON.parse(stdout)
      return NextResponse.json({ result })
    } catch (parseError) {
      console.error('Error parsing script output:', parseError)
      return NextResponse.json({ 
        error: 'Error parsing script output',
        details: 'Failed to parse JSON response' 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ 
      error: 'An error occurred while processing the request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
