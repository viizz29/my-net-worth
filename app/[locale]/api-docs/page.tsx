import type { Metadata } from "next";
import ApiDocsSwagger from "./swagger-ui";

export const metadata: Metadata = {
  title: "API Docs",
  description: "Interactive OpenAPI documentation for My Net Worth.",
};

export default function ApiDocsPage() {
  return <ApiDocsSwagger />;
}
