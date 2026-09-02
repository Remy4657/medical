import { NextRequest, NextResponse } from "next/server";

const CAS_API = "https://production.cas.so/address-kit/2025-07-01/provinces";

export async function GET(request: NextRequest): Promise<any> {
  const { searchParams } = new URL(request.url);

  const provinceCode = searchParams.get("provinceCode");

  if (!provinceCode) {
    return NextResponse.json(
      {
        message: "Vui lòng cung cấp provinceCode",
      },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${CAS_API}/${encodeURIComponent(provinceCode)}/communes`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "force-cache",
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Không thể lấy danh sách phường/xã",
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log("data: ", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/communes error:", error);
    return NextResponse.json(
      {
        message: "Có lỗi xảy ra khi lấy danh sách phường/xã",
      },
      { status: 500 },
    );
  }
}
