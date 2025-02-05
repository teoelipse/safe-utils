import { NextRequest } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const execAsync = promisify(exec);

// Fix the path by going up one level from the app directory
const projectRoot = join(process.cwd(), '..');
const SCRIPT_PATH = join(projectRoot, 'safe_hashes.sh');

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const network = searchParams.get("network");
  const address = searchParams.get("address");
  const message = searchParams.get("message");
  let tempFile: string | null = null;

  if (!network || !address || !message) {
    return new Response(
      JSON.stringify({
        error: "Missing required parameters",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    // Create a temporary file with absolute path
    tempFile = join(tmpdir(), `message-${Date.now()}.txt`);
    await writeFile(tempFile, message, 'utf8');
    console.log('Created temp file at:', tempFile);

    const command = `${SCRIPT_PATH} --network ${network} --address ${address} --message "${tempFile}" --json`;
    console.log('Executing command:', command);

    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      console.error('Script stderr:', stderr);
    }

    // Clean up the temporary file
    if (tempFile) {
      await unlink(tempFile);
      console.log('Cleaned up temp file:', tempFile);
    }

    return new Response(stdout || '{}', {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error executing script:", error);
    
    // Ensure cleanup even if there's an error
    if (tempFile) {
      try {
        await unlink(tempFile);
        console.log('Cleaned up temp file after error:', tempFile);
      } catch (cleanupError) {
        console.error('Error cleaning up temp file:', cleanupError);
      }
    }

    return new Response(
      JSON.stringify({
        error: "Failed to calculate hashes",
        details: error instanceof Error ? error.message : String(error),
        scriptPath: SCRIPT_PATH,
        tempFile: tempFile
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}