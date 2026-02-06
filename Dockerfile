FROM hugomods/hugo:exts

WORKDIR /src

COPY . .

RUN git submodule update --init --recursive

EXPOSE 1313

CMD ["hugo", "server", "--bind", "0.0.0.0", "--baseURL", "http://localhost:1313/"]
