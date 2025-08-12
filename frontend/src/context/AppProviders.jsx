import React from "react";
import { AuthProvider } from "./AuthContext";
import { GalerieProvider } from "./GalerieContext";
import { ServiceProvider } from "./ServiceContext";
import { TestimonialProvider } from "./TestimonialContext";
import { HeaderProvider } from "./HeaderContext";
import { ClientProvider } from "./ClientContext";

const AppProviders = ({ children }) => (
  <AuthProvider>
    <ClientProvider>
      <GalerieProvider>
        <ServiceProvider>
          <TestimonialProvider>
            <HeaderProvider>{children}</HeaderProvider>
          </TestimonialProvider>
        </ServiceProvider>
      </GalerieProvider>
    </ClientProvider>
  </AuthProvider>
);

export default AppProviders;
