ARG IMAGE_TAG=latest-node-16.15.0
FROM bitcli/bit-non-root:${IMAGE_TAG}
USER root
RUN mkdir build
COPY . /build
RUN chmod +x /build/entrypoint.sh
RUN chown -R user /build
USER user 
ENTRYPOINT [ "/build/entrypoint.sh" ]