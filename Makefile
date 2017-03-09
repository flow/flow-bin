FLOW_VERSION ?= $(shell node -p 'require("./package.json").version')
FLOW_BINS = \
	flow-linux64-v$(FLOW_VERSION)/flow

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
	curl -O -L https://github.com/facebook/flow/releases/download/v$(*F)/$(@D).zip; \
	unzip $(@D).zip flow/$(@F); \
	mv flow $(@D); \
	rm $(@D).zip; \
	touch $@

flow-linux64-v%/flow:
	$(get-flow)
