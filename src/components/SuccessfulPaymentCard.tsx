"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";

export default function SuccessfulPaymentCard({
  payment_intent,
  redirect_status,
}: {
  payment_intent: string;
  redirect_status: string;
}) {
  return (
    <Card className="w-full max-w-96 overflow-hidden rounded-sm bg-green-50">
      <CardHeader className="bg-green-100">
        <CardTitle className="text-green-900">Your payment</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        <p className="text-green-900">Payment_ID: {payment_intent}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-4 bg-green-950 pt-6">
        {redirect_status === "succeeded" ? (
          <Check size={24} className="text-green-400" />
        ) : (
          <X size={24} className="text-red-500" />
        )}
        <p className="text-green-400">{redirect_status}</p>
      </CardFooter>
    </Card>
  );
}
