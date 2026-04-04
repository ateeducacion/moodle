PORT ?= 8081
PHP_BIN ?= /opt/homebrew/opt/php@8.4/bin/php

.PHONY: up clean

up:
	./setup-local.sh $(PORT) $(PHP_BIN)

clean:
	rm -rf .cache
