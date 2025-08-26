#!/bin/bash

set -e

# Function to generate self-signed certificate if no certificate provided
generate_self_signed() {
    echo "Generating self-signed certificate..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/key.pem \
        -out /etc/nginx/ssl/cert.pem \
        -subj "/C=US/ST=State/L=City/O=Organization/CN=${SERVER_NAME:-localhost}"
}

# Function to setup Let's Encrypt certificate
setup_letsencrypt() {
    if [ "$USE_LETSENCRYPT" = "true" ] && [ -n "$SERVER_NAME" ] && [ -n "$SSL_EMAIL" ]; then
        echo "Setting up Let's Encrypt certificate for ${SERVER_NAME}..."

        # Generate initial self-signed certificate first to start nginx
        generate_self_signed

        # Start nginx in background for ACME challenge
        nginx -g "daemon on;"

        # Request Let's Encrypt certificate
        if certbot certonly --webroot -w /var/www/certbot \
            -d "${SERVER_NAME}" \
            --email "${SSL_EMAIL}" \
            --agree-tos \
            --non-interactive \
            --force-renewal; then

            echo "Let's Encrypt certificate obtained successfully!"

            # Update nginx config to use Let's Encrypt certificates
            export SSL_CERT_PATH="/etc/letsencrypt/live/${SERVER_NAME}/fullchain.pem"
            export SSL_KEY_PATH="/etc/letsencrypt/live/${SERVER_NAME}/privkey.pem"

            # Stop background nginx
            nginx -s stop

        else
            echo "Failed to obtain Let's Encrypt certificate, using self-signed"
        fi
    fi
}

# Function to check if custom certificates are provided via env vars
check_custom_certificates() {
    if [ -n "$SSL_CERT" ] && [ -n "$SSL_KEY" ]; then
        echo "Using custom certificates from environment variables..."
        echo "$SSL_CERT" > /etc/nginx/ssl/cert.pem
        echo "$SSL_KEY" > /etc/nginx/ssl/key.pem
        return 0
    elif [ -n "$SSL_CERT_PATH" ] && [ -n "$SSL_KEY_PATH" ]; then
        echo "Using custom certificates from files: ${SSL_CERT_PATH}, ${SSL_KEY_PATH}"
        return 0
    fi
    return 1
}

# Function to check if certificate files exist
check_certificate_files() {
    if [ -f "/etc/nginx/ssl/cert.pem" ] && [ -f "/etc/nginx/ssl/key.pem" ]; then
        echo "Using existing certificate files"
        return 0
    fi
    return 1
}

# Main certificate setup logic
setup_certificates() {
    # Priority 1: Custom certificates from env vars
    if check_custom_certificates; then
        return
    fi

    # Priority 2: Custom certificate paths
    if [ -n "$SSL_CERT_PATH" ] && [ -n "$SSL_KEY_PATH" ] && \
       [ -f "$SSL_CERT_PATH" ] && [ -f "$SSL_KEY_PATH" ]; then
        echo "Using custom certificate paths"
        return
    fi

    # Priority 3: Existing certificate files
    if check_certificate_files; then
        return
    fi

    # Priority 4: Let's Encrypt
    setup_letsencrypt

    # Priority 5: Self-signed fallback
    if ! check_certificate_files; then
        generate_self_signed
    fi
}

# Substitute environment variables in nginx config
setup_nginx_config() {
    echo "Generating nginx configuration..."
    envsubst '${NGINX_PORT} ${NGINX_HTTP_PORT} ${NGINX_HTTPS_PORT} ${BACKEND_URL} ${SERVER_NAME} ${SSL_CERT_PATH} ${SSL_KEY_PATH}' \
        < /etc/nginx/conf.d/default.conf.template \
        > /etc/nginx/conf.d/default.conf
}

# Main execution
echo "Starting certificate setup..."
setup_certificates

echo "Setting up nginx configuration..."
setup_nginx_config

echo "Starting nginx..."
exec "$@"