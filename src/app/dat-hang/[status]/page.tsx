import PaymentResult from "@/components/PaymentResult";
import { notFound } from "next/navigation";

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
  if (status !== "success" && status !== "cancel") {
    return notFound();
  }
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
