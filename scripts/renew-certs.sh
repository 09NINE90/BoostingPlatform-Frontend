#!/bin/bash
if [ "$USE_LETSENCRYPT" = "true" ]; then
    certbot renew --quiet --post-hook "nginx -s reload"
fi