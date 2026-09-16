import PaymentResult from "@/components/PaymentResult";

interface PageProps {
  params: Promise<{
    orderCode: string;
  }>;
}

export default async function PaymentResultPage({ params }: PageProps) {
  const { orderCode } = await params;

  return <PaymentResult orderCode={orderCode} />;
}
