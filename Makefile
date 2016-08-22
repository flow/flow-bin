FLOW_VERSION ?= $(shell node -p 'require("./package.json").version')
FLOW_BINS = \
	flow-linux64-v$(FLOW_VERSION)/flow \
	flow-osx-v$(FLOW_VERSION)/flow \
	flow-win64-v$(FLOW_VERSION)/flow.exe

.PHONY: all
all: clean build test

.PHONY: clean
clean:
	rm -rf flow-*-v* SHASUM256.txt

.PHONY: test
test: $(FLOW_BINS)
	shasum -c SHASUM256.txt
	node test.js

.PHONY: build
build: clean SHASUM256.txt

SHASUM256.txt: $(FLOW_BINS)
	shasum -a 256 $^ > $@

get-flow = \
	mkdir -p "$@"; \
	curl -s -L "https://github.com/facebook/flow/releases/download/v$(*F)/$(@D).zip" \
		| tar xz -C "$(@D)" --strip-components=1 -- "flow/$(@F)"; \
	touch "$@"

flow-linux64-v%/flow:
	$(get-flow)

flow-osx-v%/flow:
	$(get-flow)

flow-win64-v%/flow.exe:
	$(get-flow)
