import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";
import path from "path";

const execPromise = util.promisify(exec);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const network = searchParams.get("network");
  const address = searchParams.get("address");
  const nonce = searchParams.get("nonce");

  if (!network || !address || !nonce) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    const scriptPath = path.join(process.cwd(), "..", "safe_hashes.sh");
    const command = `${scriptPath} --network ${network} --address ${address} --nonce ${nonce}`;
    const { stdout, stderr } = await execPromise(command);

    if (stderr) {
      console.error("Script error:", stderr);
      return NextResponse.json(
        { error: "Error executing script" },
        { status: 500 }
      );
    }

    try {
      const result = JSON.parse(stdout);
      return NextResponse.json(result);
    } catch (parseError) {
      console.error("Error parsing script output:", parseError);
      return NextResponse.json(
        { error: "Error parsing script output" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while executing the script" },
      { status: 500 }
    );
  }
}
