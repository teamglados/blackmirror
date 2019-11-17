GIT_HASH=$(shell git rev-parse HEAD)

build:
	echo "Building $(GIT_HASH)"
	docker build --force-rm=true -t blackmirror:$(GIT_HASH) .

push:
	echo "Pushing $(GIT_HASH)"
	docker push blackmirror:$(GIT_HASH)

buildpush:
	$(MAKE) build
	$(MAKE) push