VERSION ?= $(shell node -p 'require("./package.json").version')
FLOW_VERSION := $(patsubst v%,%,$(VERSION))
FLOW_BINS = \
	flow-linux64-v$(FLOW_VERSION)/flow \
	flow-osx-v$(FLOW_VERSION)/flow \
	flow-win64-v$(FLOW_VERSION)/flow.exe

.PHONY: all
all: clean build test

.PHONY: clean
clean:
	rm -f .npmrc
	rm -rf flow-*-v* SHASUM256.txt

.PHONY: bump
bump:
	sed -i.bak 's/"version": ".*"/"version": "$(FLOW_VERSION)"/' package.json
	rm package.json.bak

.PHONY: test
test: $(FLOW_BINS)
	shasum -c SHASUM256.txt
	node test.js

.PHONY: build
build: clean bump SHASUM256.txt

.PHONY: push
push: build test
	git commit -am "v$(FLOW_VERSION)"
	git tag -a "v$(FLOW_VERSION)" -m "v$(FLOW_VERSION)"
	git push
	git push --tags

.PHONY: publish
publish:
ifneq ("$(NPM_TOKEN)", "")
	@echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
else
	@echo "NPM_TOKEN not set. Either set a token or run 'npm adduser' to log in"
endif
	npm publish --tag $(if $(findstring -,$(FLOW_VERSION)),next,latest)

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

flow-osx-v%/flow:
	$(get-flow)

flow-win64-v%/flow.exe:
	$(get-flow)
