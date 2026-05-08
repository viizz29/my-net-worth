"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import styles from "./swagger-ui.module.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
});

export default function ApiDocsSwagger() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>API Reference</p>
          <h1 className={styles.title}>My Net Worth API</h1>
          <p className={styles.subtitle}>
            Interactive documentation powered by Swagger UI. Use the raw spec
            if you want to import the API into Postman, Insomnia, or another
            OpenAPI-aware tool.
          </p>
          <div className={styles.links}>
            <a
              className={styles.link}
              href="/openapi.yaml"
              target="_blank"
              rel="noreferrer"
            >
              Open raw spec
            </a>
          </div>
        </header>

        <div className={`${styles.card} ${styles.swagger}`}>
          <SwaggerUI
            url="/openapi.yaml"
            docExpansion="list"
            defaultModelsExpandDepth={2}
            displayRequestDuration
          />
        </div>
      </div>
    </div>
  );
}
