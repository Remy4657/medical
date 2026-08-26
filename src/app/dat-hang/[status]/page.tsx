import PaymentResult from "@/components/PaymentResult";

interface PageProps {
  params: Promise<{
    status: string;
  }>;

  searchParams: Promise<{
    orderCode?: string;
    code?: string;
    id?: string;
    cancel?: string;
    status?: string;
  }>;
}

export default async function PaymentResultPage({
  params,
  searchParams,
}: PageProps) {
  const { status } = await params;
  const query = await searchParams;

  return (
    <PaymentResult
      type={status}
      orderCode={query.orderCode}
      code={query.code}
      paymentId={query.id}
      cancel={query.cancel}
      paymentStatus={query.status}
    />
  );
}
