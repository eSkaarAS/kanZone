"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InfoPaymentCard({ amount }: { amount: number }) {
  return (
    <Card className="w-full max-w-96 overflow-hidden rounded-sm bg-blue-50">
      <CardHeader className="bg-blue-100">
        <CardTitle className="text-blue-900">
          Beløp å betale:{" "}
          <span className="font-bold underline">{amount.toFixed(2)} NOK</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1"></CardContent>
    </Card>
  );
}
