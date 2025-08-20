import React from "react";
import { AuthProvider } from "./AuthContext";
import { GalerieProvider } from "./GalerieContext";
import { ServiceProvider } from "./ServiceContext";
import { TestimonialProvider } from "./TestimonialContext";
import { HeaderProvider } from "./HeaderContext";
import { ClientProvider } from "./ClientContext";
import { ContactProvider } from "./ContactContext";

const AppProviders = ({ children }) => (
  <AuthProvider>
    <ClientProvider>
      <GalerieProvider>
        <ServiceProvider>
          <TestimonialProvider>
            <HeaderProvider>
              <ContactProvider>{children}</ContactProvider>
            </HeaderProvider>
          </TestimonialProvider>
        </ServiceProvider>
      </GalerieProvider>
    </ClientProvider>
  </AuthProvider>
);

export default AppProviders;
