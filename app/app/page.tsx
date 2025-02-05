"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { CopyButton } from "@/components/ui/copy-button";
import { ShareButton } from "@/components/ui/share-button";
import PixelAvatar from "@/components/pixel-avatar";
import { useSearchParams } from "next/navigation";

interface FormData {
  network: string;
  chainId: number;
  address: string;
  nonce: string;
}

interface ApiResponse {
  network: {
    name: string;
    chain_id: string;
  };
  transaction: {
    multisig_address: string;
    to: string;
    value: string;
    data: string;
    encoded_message: string;
    data_decoded: {
      method: string;
      parameters: any[];
    };
  };
  hashes: {
    domain_hash: string;
    message_hash: string;
    safe_transaction_hash: string;
  };
}

const NETWORKS = [
  {
    value: "arbitrum",
    label: "Arbitrum",
    chainId: 42161,
    gnosisPrefix: "arb1",
    logo: "networks/arbitrum.ico",
  },
  {
    value: "aurora",
    label: "Aurora",
    chainId: 1313161554,
    gnosisPrefix: "aurora",
    logo: "networks/aurora.ico",
  },
  {
    value: "avalanche",
    label: "Avalanche",
    chainId: 43114,
    gnosisPrefix: "avax",
    logo: "networks/avalanche.ico",
  },
  {
    value: "base",
    label: "Base",
    chainId: 8453,
    gnosisPrefix: "base",
    logo: "networks/base.ico",
  },
  {
    value: "base-sepolia",
    label: "Base Sepolia",
    chainId: 84532,
    gnosisPrefix: "basesep",
    logo: "networks/base.ico",
  },
  {
    value: "blast",
    label: "Blast",
    chainId: 81457,
    gnosisPrefix: "blast",
    logo: "networks/blast.ico",
  },
  {
    value: "bsc",
    label: "BSC",
    chainId: 56,
    gnosisPrefix: "bnb",
    logo: "networks/bsc.ico",
  },
  {
    value: "celo",
    label: "Celo",
    chainId: 42220,
    gnosisPrefix: "celo",
    logo: "networks/celo.ico",
  },
  {
    value: "ethereum",
    label: "Ethereum",
    chainId: 1,
    gnosisPrefix: "eth",
    logo: "networks/ethereum.ico",
  },
  {
    value: "gnosis",
    label: "Gnosis Chain",
    chainId: 100,
    gnosisPrefix: "gno",
    logo: "networks/gnosis.ico",
  },
  {
    value: "gnosis-chiado",
    label: "Gnosis Chiado",
    chainId: 10200,
    gnosisPrefix: "chiado",
    logo: "networks/gnosis.ico",
  },
  {
    value: "linea",
    label: "Linea",
    chainId: 59144,
    gnosisPrefix: "linea",
    logo: "networks/linea.ico",
  },
  {
    value: "mantle",
    label: "Mantle",
    chainId: 5000,
    gnosisPrefix: "mnt",
    logo: "networks/mantle.ico",
  },
  {
    value: "optimism",
    label: "Optimism",
    chainId: 10,
    gnosisPrefix: "oeth",
    logo: "networks/optimism.ico",
  },
  {
    value: "polygon",
    label: "Polygon",
    chainId: 137,
    gnosisPrefix: "matic",
    logo: "networks/polygon.ico",
  },
  {
    value: "polygon-zkevm",
    label: "Polygon zkEVM",
    chainId: 1101,
    gnosisPrefix: "zkevm",
    logo: "networks/polygon.ico",
  },
  {
    value: "scroll",
    label: "Scroll",
    chainId: 534352,
    gnosisPrefix: "scr",
    logo: "networks/scroll.ico",
  },
  {
    value: "sepolia",
    label: "Sepolia",
    chainId: 11155111,
    gnosisPrefix: "sep",
    logo: "networks/ethereum.ico",
  },
  {
    value: "worldchain",
    label: "Worldchain",
    chainId: 10252,
    gnosisPrefix: "wc",
    logo: "networks/worldchain.ico",
  },
  {
    value: "xlayer",
    label: "xLayer",
    chainId: 204,
    gnosisPrefix: "xlayer",
    logo: "networks/xlayer.ico",
  },
  {
    value: "zksync",
    label: "zkSync",
    chainId: 324,
    gnosisPrefix: "zksync",
    logo: "networks/zksync.ico",
  },
];

export default function Home() {
  const searchParams = useSearchParams();

  const [result, setResult] = useState<{
    network?: ApiResponse["network"];
    transaction?: ApiResponse["transaction"];
    hashes?: ApiResponse["hashes"];
    error?: string;
    endpoint?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  const [safeAddress] = useState(searchParams.get("safeAddress") || "");
  const [network] = useState(() => {
    const prefix = safeAddress.split(":")[0];
    return NETWORKS.find((n) => n.gnosisPrefix === prefix)?.value || "";
  });
  const [chainId] = useState(() => {
    const prefix = safeAddress.split(":")[0];
    return NETWORKS.find((n) => n.gnosisPrefix === prefix)?.chainId || "";
  });
  const [address] = useState(() => {
    const _address = safeAddress.match(/0x[a-fA-F0-9]{40}/)?.[0];
    if (_address) {
      return _address;
    } else {
      return "";
    }
  });
  const [nonce] = useState(searchParams.get("nonce") || "");

  const form = useForm<FormData>({
    defaultValues: {
      network: network,
      chainId: Number(chainId),
      address: address,
      nonce: nonce,
    },
  });

  useEffect(() => {
    setMounted(true);
    if (safeAddress && nonce) {
      form.setValue("network", network);
      form.setValue("chainId", Number(chainId));
      form.setValue("address", address)
      form.setValue("nonce", nonce);
    }
  }, [safeAddress, nonce]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await axios.get<{ result: ApiResponse }>(
        `/api/calculate-hashes?network=${data.network}&address=${data.address}&nonce=${data.nonce}`
      );
      setResult(response.data.result);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while calculating hashes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getShareUrl = (network: string, address: string, nonce: string) => {
    const baseLink = process.env.NEXT_PUBLIC_BASE_URL;
    const networkPrefix = NETWORKS.find(
      (n) => n.value === network
    )?.gnosisPrefix;
    const safeAddress = `${networkPrefix}:${encodeURIComponent(address)}`;
    const url = `${baseLink}?safeAddress=${safeAddress}&nonce=${encodeURIComponent(
      nonce
    )}`;
    return url;
  };

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <>
      <Toaster />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Safe Hash Preview</h1>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Input Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="network"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Network</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          const selectedNetwork = NETWORKS.find(
                            (network) => network.value === value
                          );
                          if (selectedNetwork) {
                            form.setValue("chainId", selectedNetwork.chainId);
                          }
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a network">
                              {field.value && (
                                <div className="flex items-center">
                                  <img
                                    src={
                                      NETWORKS.find(
                                        (network) =>
                                          network.value === field.value
                                      )?.logo
                                    }
                                    alt={`${field.value} logo`}
                                    className="w-5 h-5 mr-2"
                                  />
                                  {
                                    NETWORKS.find(
                                      (network) => network.value === field.value
                                    )?.label
                                  }
                                </div>
                              )}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {NETWORKS.map((network) => (
                            <SelectItem
                              key={network.value}
                              value={network.value}
                            >
                              <div className="flex items-center">
                                <img
                                  src={network.logo}
                                  alt={`${network.label} logo`}
                                  className="w-5 h-5 mr-2"
                                />
                                {network.label} (Chain ID: {network.chainId})
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="chainId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chain ID</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          type="number"
                          placeholder="Enter Chain ID"
                          {...field}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            field.onChange(value);
                            const selectedNetwork = NETWORKS.find(
                              (network) => network.chainId === value
                            );
                            if (selectedNetwork) {
                              form.setValue("network", selectedNetwork.value);
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Safe Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Safe address"
                          leftIcon={<PixelAvatar address={field.value} />}
                          {...field}
                          onChange={(e) => {
                            const address =
                              e.target.value.match(/0x[a-fA-F0-9]{40}/)?.[0];
                            if (address) {
                              field.onChange(address);
                            }

                            const [sepPrefix, rest] = e.target.value.split(":");
                            if (
                              rest &&
                              NETWORKS.some(
                                (network) => network.gnosisPrefix === sepPrefix
                              )
                            ) {
                              const networkWithPrefix = NETWORKS.find(
                                (network) => network.gnosisPrefix === sepPrefix
                              );
                              form.setValue(
                                "network",
                                networkWithPrefix!.value
                              );
                              form.setValue(
                                "chainId",
                                networkWithPrefix!.chainId
                              );
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nonce"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nonce</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter nonce" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Calculating..." : "Calculate Hashes"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {(isLoading || result) && (
          <Card className="mb-8 relative">
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <div className="absolute top-3 right-3">
              <ShareButton
                url={getShareUrl(
                  form.getValues("network"),
                  form.getValues("address"),
                  form.getValues("nonce")
                )}
              />
            </div>
            <CardContent>
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </>
              ) : result ? (
                result.error ? (
                  <div className="space-y-2">
                    <div className="text-red-500 font-semibold">
                      {result.error}
                    </div>
                    {result.endpoint && (
                      <div>
                        <span className="font-semibold">API Endpoint: </span>
                        <a
                          href={result.endpoint}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline break-all"
                        >
                          {result.endpoint}
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-8 w-full">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Transaction Data
                      </h3>
                      {[
                        { key: "multisig_address", label: "Multisig address" },
                        { key: "to", label: "To" },
                        { key: "data", label: "Data" },
                        { key: "encoded_message", label: "Encoded message" },
                      ].map(({ key, label }) => (
                        <div
                          key={key}
                          className="flex flex-col space-y-2 w-full"
                        >
                          <Label>{label}</Label>
                          <div className="flex items-center space-x-2 w-full">
                            <Input
                              readOnly
                              value={result.transaction?.[key as keyof typeof result.transaction]}
                            />
                            <CopyButton
                              value={result.transaction?.[key as keyof typeof result.transaction] || ""}
                              onCopy={() => {
                                toast({
                                  title: "Copied to clipboard",
                                  description: `${label} has been copied to your clipboard.`,
                                });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <div className="flex flex-col space-y-2 w-full">
                        <Label>Method</Label>
                        <Input
                          readOnly
                          value={result.transaction?.data_decoded?.method || ""}
                        />
                      </div>
                      <div className="flex flex-col space-y-2 w-full">
                        <Label>Parameters</Label>
                        <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto dark:bg-zinc-900">
                          {JSON.stringify(
                            result.transaction?.data_decoded?.parameters,
                            null,
                            2
                          )}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Hashes</h3>
                      {[
                        { key: "safe_transaction_hash", label: "safeTxHash" },
                        { key: "domain_hash", label: "Domain hash" },
                        { key: "message_hash", label: "Message hash" },
                      ].map(({ key, label }) => (
                        <div
                          key={key}
                          className="flex flex-col space-y-2 w-full"
                        >
                          <Label>{label}</Label>
                          <div className="flex items-center space-x-2 w-full">
                            <Input readOnly value={result.hashes?.[key as keyof typeof result.hashes]} />
                            <CopyButton
                              value={result.hashes?.[key as keyof typeof result.hashes] || ""}
                              onCopy={() => {
                                toast({
                                  title: "Copied to clipboard",
                                  description: `${label} has been copied to your clipboard.`,
                                });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                <p>No result available</p>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
