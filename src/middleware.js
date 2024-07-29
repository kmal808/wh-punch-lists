import { NextResponse } from "next/server";
import { ThemeProvider } from "next-themes";

export default function Theme({ children }) {
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "x-createxyz-project-id",
    "b9fe2afe-6469-4539-9400-76712edb1bfd"
  );

  request.nextUrl.href = `https://www.create.xyz/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}
