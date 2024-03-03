package treino.treinoapplication.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jboss.logging.Logger;
import org.keycloak.AuthorizationContext;
import org.keycloak.adapters.authorization.PolicyEnforcer;
import org.keycloak.adapters.authorization.TokenPrincipal;
import org.keycloak.adapters.authorization.integration.elytron.ServletHttpRequest;
import org.keycloak.adapters.authorization.integration.elytron.ServletHttpResponse;
import org.keycloak.adapters.authorization.integration.jakarta.ServletPolicyEnforcerFilter;
import org.keycloak.adapters.authorization.spi.ConfigurationResolver;
import org.keycloak.adapters.authorization.spi.HttpRequest;
import org.keycloak.representations.adapters.config.PolicyEnforcerConfig;

import java.io.IOException;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public class ServletKeycloakConfig implements Filter, ServletContextAttributeListener{

    private final Logger logger = Logger.getLogger(this.getClass());
    private final Map<PolicyEnforcerConfig, PolicyEnforcer> policyEnforcer;
    private final ConfigurationResolver configResolver;

    public ServletKeycloakConfig(ConfigurationResolver configResolver) {
        this.configResolver = configResolver;
        this.policyEnforcer = Collections.synchronizedMap(new HashMap());
    }

    public void init(FilterConfig filterConfig) {
    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        final HttpServletRequest request = (HttpServletRequest)servletRequest;
        HttpServletResponse response = (HttpServletResponse)servletResponse;
        ServletHttpRequest httpRequest = new ServletHttpRequest(request, new TokenPrincipal() {
            public String getRawToken() {
                return ServletKeycloakConfig.this.extractBearerToken(request);
            }
        });
        PolicyEnforcer policyEnforcer = this.getOrCreatePolicyEnforcer(request, httpRequest);
        AuthorizationContext authzContext = policyEnforcer.enforce(httpRequest, new ServletHttpResponse(response));
        request.setAttribute(AuthorizationContext.class.getName(), authzContext);
        if (authzContext.isGranted()) {
            this.logger.debug("Request authorized, continuing the filter chain");
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            this.logger.debugf("Unauthorized request to path [%s], aborting the filter chain", request.getRequestURI());
        }

    }

    protected String extractBearerToken(HttpServletRequest request) {
        Enumeration<String> authorizationHeaderValues = request.getHeaders("Authorization");

        while(authorizationHeaderValues.hasMoreElements()) {
            String value = (String)authorizationHeaderValues.nextElement();
            String[] parts = value.trim().split("\\s+");
            if (parts.length == 2) {
                String bearer = parts[0];
                if (bearer.equalsIgnoreCase("Bearer")) {
                    return parts[1];
                }
            }
        }

        return null;
    }

    private PolicyEnforcer getOrCreatePolicyEnforcer(final HttpServletRequest servletRequest, HttpRequest request) {
        return (PolicyEnforcer)this.policyEnforcer.computeIfAbsent(this.configResolver.resolve(request), new Function<PolicyEnforcerConfig, PolicyEnforcer>() {
            public PolicyEnforcer apply(PolicyEnforcerConfig enforcerConfig) {
                return ServletKeycloakConfig.this.createPolicyEnforcer(servletRequest, enforcerConfig);
            }
        });
    }

    protected PolicyEnforcer createPolicyEnforcer(HttpServletRequest servletRequest, PolicyEnforcerConfig enforcerConfig) {
        String authServerUrl = enforcerConfig.getAuthServerUrl();
        return PolicyEnforcer.builder().authServerUrl(authServerUrl).realm(enforcerConfig.getRealm()).clientId(enforcerConfig.getResource()).credentials(enforcerConfig.getCredentials()).bearerOnly(false).enforcerConfig(enforcerConfig).build();
    }
}
    

