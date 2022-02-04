.PHONY: sakura.run
sakura.run:
	node index.js

.PHONY: sakura.build
sakura.build:
	cat index.js | nexe
