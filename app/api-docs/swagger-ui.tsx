"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import styles from "./swagger-ui.module.css";
import { useEffect, useRef } from "react";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
});


export default function ApiDocsSwagger() {
  const uiRef = useRef<any>(null);

  useEffect(() => {
    // attachRequestInterceptor();
  }, []);

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
            onComplete={(system) => {
              uiRef.current = system;
              // Restore session from localStorage if a token exists
              const savedToken = localStorage.getItem("authToken");
              if (savedToken) {
                system.preauthorizeApiKey("bearerAuth", savedToken);
              }
            }}
            responseInterceptor={(response) => {
              console.log("Response received:", response);
              if (response.url.includes('/auth/login') && response.status === 200) {
                let responseBody = response.body;

                console.log("Original response body:", responseBody);

                if (typeof responseBody === 'string') {
                  responseBody = JSON.parse(responseBody);
                }

                const { token, user } = responseBody;
                if (token) {
                  localStorage.setItem('authToken', token);  // Store token locally
                  uiRef.current?.preauthorizeApiKey("bearerAuth", token);  // Preauthorize token for future requests
                  console.log("Token stored and preauthorized:", token);
                }
              }
              return response;
            }}
          />
        </div>
      </div>
    </div>
  );
}
