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
import PixelAvatar  from "@/components/pixel-avatar";

interface FormData {
  network: string;
  chainId: number;
  address: string;
  nonce: string;
}

const NETWORKS = [
  {
    value: "arbitrum",
    label: "Arbitrum",
    chainId: 42161,
    logo: "networks/arbitrum.ico",
  },
  {
    value: "aurora",
    label: "Aurora",
    chainId: 1313161554,
    logo: "networks/aurora.ico",
  },
  {
    value: "avalanche",
    label: "Avalanche",
    chainId: 43114,
    logo: "networks/avalanche.ico",
  },
  { value: "base", label: "Base", chainId: 8453, logo: "networks/base.ico" },
  {
    value: "base-sepolia",
    label: "Base Sepolia",
    chainId: 84532,
    logo: "networks/base.ico",
  },
  {
    value: "blast",
    label: "Blast",
    chainId: 81457,
    logo: "networks/blast.ico",
  },
  { value: "bsc", label: "BSC", chainId: 56, logo: "networks/bsc.ico" },
  { value: "celo", label: "Celo", chainId: 42220, logo: "networks/celo.ico" },
  {
    value: "ethereum",
    label: "Ethereum",
    chainId: 1,
    logo: "networks/ethereum.ico",
  },
  {
    value: "gnosis",
    label: "Gnosis Chain",
    chainId: 100,
    logo: "networks/gnosis.ico",
  },
  {
    value: "gnosis-chiado",
    label: "Gnosis Chiado",
    chainId: 10200,
    logo: "networks/gnosis.ico",
  },
  {
    value: "linea",
    label: "Linea",
    chainId: 59144,
    logo: "networks/linea.ico",
  },
  {
    value: "mantle",
    label: "Mantle",
    chainId: 5000,
    logo: "networks/mantle.ico",
  },
  {
    value: "optimism",
    label: "Optimism",
    chainId: 10,
    logo: "networks/optimism.ico",
  },
  {
    value: "polygon",
    label: "Polygon",
    chainId: 137,
    logo: "networks/polygon.ico",
  },
  {
    value: "polygon-zkevm",
    label: "Polygon zkEVM",
    chainId: 1101,
    logo: "networks/polygon.ico",
  },
  {
    value: "scroll",
    label: "Scroll",
    chainId: 534352,
    logo: "networks/scroll.ico",
  },
  {
    value: "sepolia",
    label: "Sepolia",
    chainId: 11155111,
    logo: "networks/ethereum.ico",
  },
  {
    value: "worldchain",
    label: "Worldchain",
    chainId: 10252,
    logo: "networks/worldchain.ico",
  },
  {
    value: "xlayer",
    label: "xLayer",
    chainId: 204,
    logo: "networks/xlayer.ico",
  },
  {
    value: "zksync",
    label: "zkSync",
    chainId: 324,
    logo: "networks/zksync.ico",
  },
];

export default function Home() {
  const [result, setResult] = useState<{
    hashes: { [key: string]: string };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { toast } = useToast();

  const form = useForm<FormData>({
    defaultValues: {
      network: "",
      chainId: 0,
      address: "",
      nonce: "",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await axios.get(
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

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <>
      <Toaster />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Safe Hash Calculator</h1>
        <Card className="mb-8">
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
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </>
              ) : result ? (
                <div className="space-y-4 w-full">
                  {["domainHash", "messageHash", "safeTransactionHash"].map(
                    (hashType) => (
                      <div key={hashType} className="flex flex-col space-y-2 w-full">
                        <Label>
                          {hashType.charAt(0).toUpperCase() + hashType.slice(1)}
                        </Label>
                        <div className="flex items-center space-x-2 w-full">
                          <Input readOnly value={result.hashes[hashType]} />
                          <CopyButton
                            value={result.hashes[hashType]}
                            onCopy={() => {
                              toast({
                                title: "Copied to clipboard",
                                description: `${hashType} has been copied to your clipboard.`,
                              });
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
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
