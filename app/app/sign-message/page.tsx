"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { CopyButton } from "@/components/ui/copy-button";
import { ShareButton } from "@/components/ui/share-button";
import { NETWORKS } from "../constants";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";


interface FormData {
  network: string;
  chainId: number;
  address: string;
  message: string;
}

export default function SignMessage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    network?: {
      name: string;
      chain_id: string;
    };
    message?: {
      multisig_address: string;
      content: string;
    };
    hashes?: {
      raw_message_hash: string;
      domain_hash: string;
      message_hash: string;
      safe_message_hash: string;
    };
    error?: string;
    endpoint?: string;
  } | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      network: "",
      chainId: 0,
      address: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await fetch(
        `/api/sign-message?network=${data.network}&address=${data.address}&message=${encodeURIComponent(
          data.message
        )}`
      );
      const jsonResult = await response.json();
      setResult(jsonResult);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while calculating message hashes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Sign OffChain Message</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Input Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Safe Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Safe address" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter message to sign" 
                          className="min-h-[100px] resize-y"
                          {...field} 
                        />
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

        <Card className="mb-8 relative">
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
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Hashes</h3>
                    {[
                      { key: "raw_message_hash", label: "Raw Message Hash" },
                      { key: "domain_hash", label: "Domain Hash" },
                      { key: "message_hash", label: "Message Hash" },
                      { key: "safe_message_hash", label: "Safe Message Hash" },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex flex-col space-y-2">
                        <Label>{label}</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            readOnly
                            value={result.hashes?.[key as keyof typeof result.hashes] || ""}
                          />
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
      </main>
    </>
  );
}